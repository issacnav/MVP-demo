export default function Loading() {
  return (
    <main className="px-3 sm:px-4 md:px-2">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-16 bg-gradient-to-b from-background to-transparent" />
      <div className="mx-auto md:max-w-3xl">
        <div className="screen-line-before screen-line-after border-x border-edge">
          <div className="px-4 py-8 sm:py-10">
            <div className="h-9 w-40 animate-pulse rounded-md bg-muted" />
            <div className="mt-3 h-4 w-64 animate-pulse rounded bg-muted" />
          </div>
        </div>
        <div className="section-separator relative flex h-6 w-full border-x border-edge" />
        <div className="screen-line-after border-x border-edge px-4 py-5">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="mt-3 h-4 w-11/12 animate-pulse rounded bg-muted" />
          <div className="mt-3 h-4 w-9/12 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </main>
  );
}
