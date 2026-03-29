import { getBlogByIdForAdmin } from "@/actions/blog.actions";
import EditBlogComponent from "./_component/EditBlogComponent";
import { getAllBlogCategories } from "@/actions/blog.category.actions";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function EditBlogSkeleton() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Skeleton className="h-10 w-48 mb-6" />
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-60" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-96 w-full" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  );
}

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blogResult = await getBlogByIdForAdmin(id);
  const { data: categories } = await getAllBlogCategories();

  if (!blogResult.success || !blogResult.data) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-red-500">Blog not found or failed to load.</p>
      </div>
    );
  }

  return (
    <div>
      <Suspense fallback={<EditBlogSkeleton />}>
        <EditBlogComponent blog={blogResult.data} categories={categories || []} />
      </Suspense>
    </div>
  );
}
