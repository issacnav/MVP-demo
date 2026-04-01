import { CrossMarker, SectionSeparator } from "@/components/LayoutParts";

function Skeleton({ className }: { className?: string }) {
  return <div className={`motion-safe:animate-pulse motion-reduce:animate-none rounded bg-muted ${className ?? ""}`} />;
}

export default function ProjectsLoading() {
  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-16 bg-gradient-to-b from-background to-transparent" />
      {/* Header placeholder */}
      <header className="sticky top-0 z-50 bg-background px-3 sm:px-4 md:px-2">
        <div className="screen-line-before screen-line-after mx-auto flex h-12 items-center justify-between gap-1.5 border-x border-edge px-2 md:max-w-3xl">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <div className="flex-1" />
          <Skeleton className="h-4 w-16" />
        </div>
      </header>

      <main className="px-3 sm:px-4 md:px-2">
        <div className="mx-auto md:max-w-3xl">
          {/* Page header skeleton */}
          <div className="screen-line-before screen-line-after border-x border-edge">
            <div className="relative px-4 py-8">
              <CrossMarker position="top-left" />
              <CrossMarker position="top-right" />
              <Skeleton className="h-9 w-40" />
              <Skeleton className="mt-2 h-4 w-64" />
            </div>
          </div>

          <SectionSeparator />

          {/* Project card skeletons */}
          {[0, 1].map((i) => (
            <div key={i} className="screen-line-after border-x border-edge">
              <div className="relative px-4 py-5">
                {i === 0 && (
                  <>
                    <CrossMarker position="top-left" />
                    <CrossMarker position="top-right" />
                  </>
                )}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="flex gap-1.5 pt-1">
                      <Skeleton className="h-5 w-20 rounded-md" />
                      <Skeleton className="h-5 w-24 rounded-md" />
                      <Skeleton className="h-5 w-16 rounded-md" />
                    </div>
                  </div>
                  <Skeleton className="mt-1 h-4 w-4 shrink-0" />
                </div>
              </div>
            </div>
          ))}

          <SectionSeparator />
        </div>
      </main>
    </>
  );
}
