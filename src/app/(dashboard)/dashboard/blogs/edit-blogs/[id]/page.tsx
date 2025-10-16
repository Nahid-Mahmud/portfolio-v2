import { getBlogById } from "@/actions/blog.actions";
import EditBlogComponent from "./_component/EditBlogComponent";
import { getAllBlogCategories } from "@/actions/blog.category.actions";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: blog } = await getBlogById(id);
  const { data: categories } = await getAllBlogCategories();

  return (
    <div>
      <EditBlogComponent blog={blog} categories={categories} />
    </div>
  );
}
