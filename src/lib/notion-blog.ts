import "server-only";

import { unstable_cache } from "next/cache";
import {
  Client,
  collectPaginatedAPI,
  isNotionClientError,
  isFullPage,
  type PageObjectResponse,
} from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { localBlogCache } from "@/lib/local-blog-cache";

export const BLOG_REVALIDATE_SECONDS = 60;
export const BLOG_CACHE_TAG = "notion-blog";

export type BlogPostPreview = {
  pageId: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  formattedDate: string;
  tags: string[];
  coverUrl: string | null;
  readTimeMinutes: number;
};

export type BlogPost = BlogPostPreview & {
  markdown: string;
};

type BlogIndexResult = {
  posts: BlogPostPreview[];
  error: boolean;
  configured: boolean;
};

type BlogPostResult = {
  post: BlogPost | null;
  error: boolean;
  configured: boolean;
};

const notionToken = process.env.NOTION_TOKEN?.trim();
const notionDatabaseId = process.env.NOTION_DATABASE_ID?.trim();

function hasValue(value?: string | null) {
  return Boolean(value && !value.includes("your_") && !value.includes("_here"));
}

function isConfigured() {
  return hasValue(notionToken) && hasValue(notionDatabaseId);
}

function createNotionClient() {
  if (!notionToken) {
    return null;
  }

  return new Client({
    auth: notionToken,
  });
}

function getTitle(page: PageObjectResponse) {
  const titleProperty = page.properties.Title;

  if (titleProperty?.type === "title") {
    return titleProperty.title.map((item) => item.plain_text).join("").trim();
  }

  const fallbackTitle = Object.values(page.properties).find(
    (property) => property.type === "title"
  );

  return fallbackTitle?.type === "title"
    ? fallbackTitle.title.map((item) => item.plain_text).join("").trim()
    : "Untitled";
}

function getRichText(page: PageObjectResponse, propertyName: string) {
  const property = page.properties[propertyName];

  if (!property) {
    return "";
  }

  if (property.type === "rich_text") {
    return property.rich_text.map((item) => item.plain_text).join("").trim();
  }

  if (property.type === "url") {
    return property.url?.trim() ?? "";
  }

  return "";
}

function getDate(page: PageObjectResponse, propertyName: string) {
  const property = page.properties[propertyName];
  return property?.type === "date" ? property.date?.start ?? "" : "";
}

function getSelect(page: PageObjectResponse, propertyName: string) {
  const property = page.properties[propertyName];
  return property?.type === "select" ? property.select?.name ?? "" : "";
}

function getMultiSelect(page: PageObjectResponse, propertyName: string) {
  const property = page.properties[propertyName];

  return property?.type === "multi_select"
    ? property.multi_select.map((item) => item.name)
    : [];
}

function getCoverUrl(page: PageObjectResponse) {
  const coverProperty = getRichText(page, "Cover");

  if (coverProperty) {
    return coverProperty;
  }

  if (!page.cover) {
    return null;
  }

  if (page.cover.type === "external") {
    return page.cover.external.url;
  }

  if (page.cover.type === "file") {
    return page.cover.file.url;
  }

  return null;
}

function formatPublishedDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function countWords(value: string) {
  return value
    .replace(/[#_*`>\-\[\]\(\)!]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function getReadTimeMinutes(value: string) {
  return Math.max(2, Math.ceil(countWords(value) / 200));
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizePreview(page: PageObjectResponse): BlogPostPreview | null {
  const status = getSelect(page, "Status");

  if (status !== "Published") {
    return null;
  }

  const title = getTitle(page);
  const publishedAt = getDate(page, "Published");

  if (!title || !publishedAt) {
    return null;
  }

  const excerpt = getRichText(page, "Excerpt");
  const slug = getRichText(page, "Slug") || slugify(title);

  if (!slug) {
    return null;
  }

  return {
    pageId: page.id,
    title,
    slug,
    excerpt,
    publishedAt,
    formattedDate: formatPublishedDate(publishedAt),
    tags: getMultiSelect(page, "Tags"),
    coverUrl: getCoverUrl(page),
    readTimeMinutes: getReadTimeMinutes(excerpt),
  };
}

function getLocalBlogPreview(post: (typeof localBlogCache)[number]): BlogPostPreview {
  return {
    pageId: post.pageId,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    formattedDate: formatPublishedDate(post.publishedAt),
    tags: [...post.tags],
    coverUrl: post.coverUrl,
    readTimeMinutes: getReadTimeMinutes(post.excerpt),
  };
}

function getLocalBlogPreviews() {
  return [...localBlogCache]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .map(getLocalBlogPreview);
}

function getLocalBlogPostBySlug(slug: string): BlogPost | null {
  const post = localBlogCache.find((item) => item.slug === slug);

  if (!post) {
    return null;
  }

  return {
    ...getLocalBlogPreview(post),
    markdown: post.markdown,
    readTimeMinutes: getReadTimeMinutes(post.markdown),
  };
}

function mergeWithLocalCache(posts: BlogPostPreview[]) {
  if (posts.length > 0) {
    return posts;
  }

  return getLocalBlogPreviews();
}

async function fetchPublishedPreviews(): Promise<BlogIndexResult> {
  if (!isConfigured()) {
    return {
      posts: mergeWithLocalCache([]),
      error: false,
      configured: false,
    };
  }

  const notion = createNotionClient();

  if (!notion || !notionDatabaseId) {
    return {
      posts: mergeWithLocalCache([]),
      error: false,
      configured: false,
    };
  }

  try {
    const results = await collectPaginatedAPI(notion.dataSources.query, {
      data_source_id: notionDatabaseId,
      page_size: 100,
    });

    const posts = results
      .filter(isFullPage)
      .map(normalizePreview)
      .filter((post): post is BlogPostPreview => Boolean(post))
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

    return {
      posts: mergeWithLocalCache(posts),
      error: false,
      configured: true,
    };
  } catch (error) {
    if (!isNotionClientError(error)) {
      console.error("Failed to fetch blog posts from Notion.", error);
    } else {
      console.error("Failed to fetch blog posts from Notion.", error.code);
    }

    return {
      posts: mergeWithLocalCache([]),
      error: true,
      configured: true,
    };
  }
}

const getPublishedPreviews = unstable_cache(fetchPublishedPreviews, ["notion-blog-index"], {
  revalidate: BLOG_REVALIDATE_SECONDS,
  tags: [BLOG_CACHE_TAG],
});

async function fetchMarkdownForPage(pageId: string) {
  const notion = createNotionClient();

  if (!notion) {
    return "";
  }

  const n2m = new NotionToMarkdown({
    notionClient: notion,
  });

  const markdownBlocks = await n2m.pageToMarkdown(pageId);
  const markdown = n2m.toMarkdownString(markdownBlocks).parent;

  return markdown.trim();
}

function getMarkdownForPage(pageId: string) {
  return unstable_cache(
    async () => fetchMarkdownForPage(pageId),
    ["notion-blog-page", pageId],
    {
      revalidate: BLOG_REVALIDATE_SECONDS,
      tags: [BLOG_CACHE_TAG],
    }
  )();
}

export async function getBlogIndexData(): Promise<BlogIndexResult> {
  return getPublishedPreviews();
}

export const getBlogStaticParams = unstable_cache(async () => {
  const { posts } = await getPublishedPreviews();
  return posts.map((post) => ({ slug: post.slug }));
}, ["notion-blog-static-params"], {
  revalidate: BLOG_REVALIDATE_SECONDS,
  tags: [BLOG_CACHE_TAG],
});

export async function getBlogPostBySlug(slug: string): Promise<BlogPostResult> {
  const { posts, error, configured } = await getPublishedPreviews();
  const preview = posts.find((post) => post.slug === slug) ?? null;
  const localFallbackPost = getLocalBlogPostBySlug(slug);

  if (!preview) {
    return {
      post: localFallbackPost,
      error,
      configured: configured || Boolean(localFallbackPost),
    };
  }

  if (preview.pageId.startsWith("fallback:")) {
    return {
      post: localFallbackPost,
      error: false,
      configured,
    };
  }

  try {
    const markdown = await getMarkdownForPage(preview.pageId);

    return {
      post: {
        ...preview,
        markdown,
        readTimeMinutes: getReadTimeMinutes(markdown || preview.excerpt),
      },
      error: false,
      configured,
    };
  } catch (error) {
    if (!isNotionClientError(error)) {
      console.error(`Failed to convert Notion page ${preview.pageId} to markdown.`, error);
    } else {
      console.error(`Failed to convert Notion page ${preview.pageId} to markdown.`, error.code);
    }

    return {
      post: localFallbackPost,
      error: true,
      configured: configured || Boolean(localFallbackPost),
    };
  }
}
