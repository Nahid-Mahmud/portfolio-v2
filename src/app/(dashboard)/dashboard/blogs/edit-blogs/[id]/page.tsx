import { getBlogById } from "@/actions/blog.actions";
import EditBlogComponent from "./_component/EditBlogComponent";
import { getAllBlogCategories } from "@/actions/blog.category.actions";

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  console.log(params.id);
  const id = params.id;
  const { data: blog } = await getBlogById(id);
  const { data: categories } = await getAllBlogCategories();
  console.log(categories);
  console.log(blog);
  return (
    <div>
      <EditBlogComponent blog={blog} categories={categories} />
    </div>
  );
}
