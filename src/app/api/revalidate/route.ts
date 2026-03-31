import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { BLOG_CACHE_TAG } from "@/lib/notion-blog";

export const runtime = "nodejs";

function isAuthorized(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET?.trim();

  if (!secret) {
    return {
      ok: false as const,
      response: NextResponse.json(
        { revalidated: false, message: "REVALIDATE_SECRET is not configured." },
        { status: 500 }
      ),
    };
  }

  const providedSecret =
    request.nextUrl.searchParams.get("secret") ??
    request.headers.get("x-revalidate-secret") ??
    "";

  if (providedSecret !== secret) {
    return {
      ok: false as const,
      response: NextResponse.json(
        { revalidated: false, message: "Invalid secret." },
        { status: 401 }
      ),
    };
  }

  return { ok: true as const };
}

function runRevalidation(path?: string | null) {
  revalidateTag(BLOG_CACHE_TAG, "max");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");

  if (path && path.startsWith("/")) {
    revalidatePath(path);
  }
}

export async function GET(request: NextRequest) {
  const auth = isAuthorized(request);

  if (!auth.ok) {
    return auth.response;
  }

  const path = request.nextUrl.searchParams.get("path");
  runRevalidation(path);

  return NextResponse.json({
    revalidated: true,
    now: true,
    path: path || "/blog",
    tag: BLOG_CACHE_TAG,
  });
}

export async function POST(request: NextRequest) {
  const auth = isAuthorized(request);

  if (!auth.ok) {
    return auth.response;
  }

  let path: string | null = null;

  try {
    const body = (await request.json()) as { path?: string };
    path = body.path ?? null;
  } catch {
    path = null;
  }

  runRevalidation(path);

  return NextResponse.json({
    revalidated: true,
    now: true,
    path: path || "/blog",
    tag: BLOG_CACHE_TAG,
  });
}
