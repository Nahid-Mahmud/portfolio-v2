"use server";
import envVariables from "@/config/env";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createBlog(data: {
  title: string;
  content: string;
  description: string;
  photo: File;
  altText: string;
  categoryId: string;
  tags: string;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const headersOptions = {
    // "Content-Type": "application/json",
    ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
  };

  const formData = new FormData();
  formData.append(
    "data",
    JSON.stringify({
      title: data.title,
      content: data.content,
      description: data.description,
      altText: data.altText,
      categoryId: data.categoryId,
      tags: data.tags.split(",").map((tag: string) => tag.trim()),
    })
  );
  formData.append("photo", data.photo);
  const res = await fetch(`${envVariables.NEXT_PUBLIC_API_URL}/blogs`, {
    method: "POST",
    headers: headersOptions,
    body: formData,
  });

  const responseData = await res.json();

  if (!res.ok) {
    return { success: false, error: `HTTP error! status: ${res.status}`, details: responseData };
  }

  revalidatePath("/dashboard/blogs/all-blogs");
  revalidatePath("/blogs");

  return { success: true, data: responseData.data };
}

// * get all blogs function
export async function getAllBlogs() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const headersOptions = {
    "Content-Type": "application/json",
    ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
  };

  const res = await fetch(`${envVariables.NEXT_PUBLIC_API_URL}/blogs`, {
    method: "GET",
    headers: headersOptions,
    next: { revalidate: 10 }, // ISR: Revalidate every 10 seconds
  });

  if (!res.ok) {
    return { success: false, error: `HTTP error! status: ${res.status}` };
  }

  const responseData = await res.json();
  return { success: true, data: responseData.data };
}

// * get blog by id function
export async function getBlogById(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const headersOptions = {
    "Content-Type": "application/json",
    ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
  };

  const res = await fetch(`${envVariables.NEXT_PUBLIC_API_URL}/blogs/${id}`, {
    method: "GET",
    headers: headersOptions,
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    return { success: false, error: `HTTP error! status: ${res.status}` };
  }

  const responseData = await res.json();
  return { success: true, data: responseData.data };
}

// * delete blog function
export async function deleteBlog(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const headersOptions = {
    "Content-Type": "application/json",
    ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
  };

  const res = await fetch(`${envVariables.NEXT_PUBLIC_API_URL}/blogs/${id}`, {
    method: "DELETE",
    headers: headersOptions,
  });

  if (!res.ok) {
    return { success: false, error: `HTTP error! status: ${res.status}` };
  }

  revalidatePath("/dashboard/blogs/all-blogs");
  revalidatePath("/blogs");

  return { success: true };
}

// * update blog function
export async function updateBlog(
  id: string,
  data: {
    title: string;
    content: string;
    description: string;
    photo?: File | undefined;
    altText: string;
    category: string;
    tags: string;
    deletePhoto?: string | undefined;
  }
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const headersOptions = {
    // "Content-Type": "application/json",
    ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
  };

  const formData = new FormData();
  formData.append(
    "data",
    JSON.stringify({
      title: data.title,
      content: data.content,
      description: data.description,
      altText: data.altText,
      category: data.category,
      tags: data.tags.split(",").map((tag: string) => tag.trim()),
      deletePhoto: data.deletePhoto,
    })
  );
  if (data.photo) {
    formData.append("photo", data.photo);
  }

  const res = await fetch(`${envVariables.NEXT_PUBLIC_API_URL}/blogs/${id}`, {
    method: "PATCH",
    headers: headersOptions,
    body: formData,
  });

  const responseData = await res.json();

  if (!res.ok) {
    return { success: false, error: `HTTP error! status: ${res.status}`, details: responseData };
  }

  revalidatePath("/dashboard/blogs/all-blogs");
  revalidatePath("/blogs");

  return { success: true, data: responseData.data };
}
