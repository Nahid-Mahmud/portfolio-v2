import { getAllBlogCategories } from "@/actions/blog.category.actions";
import CategoryList from "@/components/dashboard/blogs/category-list";

export const dynamic = "force-dynamic";

export default async function BlogCategory() {
  const res = await getAllBlogCategories();

  return (
    <div>
      <CategoryList categories={res.data} />
    </div>
  );
}
