import * as React from "react";

import { cn } from "@/lib/utils";

function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-[24px] border border-border bg-card/85 text-card-foreground shadow-[0_20px_60px_-40px_rgba(0,0,0,0.4)] backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}

function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="card-content" className={cn("p-6", className)} {...props} />;
}

export { Card, CardContent };
