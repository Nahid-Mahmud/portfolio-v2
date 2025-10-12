import { getAllBlogCategories } from "@/actions/blog.category.actions";
import CategoryList from "@/components/dashboard/blogs/category-list";

export default async function BlogCategory() {
  const res = await getAllBlogCategories();

  return (
    <div>
      <CategoryList categories={res.data} />
    </div>
  );
}
