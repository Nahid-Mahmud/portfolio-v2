import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Clock } from "lucide-react";

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation Skeleton */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <div className="flex items-center space-x-2 text-sm">
            <Skeleton className="h-4 w-12" />
            <span className="text-muted-foreground">/</span>
            <Skeleton className="h-4 w-12" />
            <span className="text-muted-foreground">/</span>
            <Skeleton className="h-4 w-32" />
          </div>
        </nav>

        {/* Back Button Skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Article Header Skeleton */}
          <header className="space-y-4">
            <Skeleton className="h-12 w-3/4" /> {/* Title */}
            <div className="flex items-center gap-4 text-muted-foreground flex-wrap">
              <Skeleton className="h-4 w-24" /> {/* Date */}
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Skeleton className="h-4 w-16" /> {/* Reading time */}
              </div>
              {/* Tags skeleton */}
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16 rounded-md" />
                <Skeleton className="h-6 w-20 rounded-md" />
                <Skeleton className="h-6 w-14 rounded-md" />
              </div>
            </div>
          </header>

          {/* Featured Image Skeleton */}
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Skeleton className="w-full h-full" />
          </div>

          {/* Article Content Skeleton */}
          <article className="space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-6 w-1/2" /> {/* Subheading */}
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            {/* Code block skeleton */}
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-full" />
            </div>
          </article>

          {/* Author Section Skeleton */}
          <footer className="flex flex-col py-6 border-t border-border/50 mt-12 gap-4">
            <div className="mb-4 sm:mb-0">
              <Skeleton className="h-5 w-20 mb-2" /> {/* "Written by" */}
              <Skeleton className="h-7 w-48 mb-1" /> {/* Author name */}
              <Skeleton className="h-5 w-32" /> {/* Author title */}
            </div>

            {/* Social Icons Skeleton */}
            <div className="flex items-center gap-3">
              <Skeleton className="w-9 h-9 rounded-full" />
              <Skeleton className="w-9 h-9 rounded-full" />
              <Skeleton className="w-9 h-9 rounded-full" />
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
