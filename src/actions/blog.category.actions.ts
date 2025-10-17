"use server";

import envVariables from "@/config/env";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

async function createBlogCategory(data: { name: string; description?: string }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const headersOptions = {
    "Content-Type": "application/json",
    ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
  };
  const res = await fetch(`${envVariables.NEXT_PUBLIC_API_URL}/blog-categories`, {
    method: "POST",
    headers: headersOptions,
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) {
    return { success: false, error: `HTTP error! status: ${res.status}`, details: responseData };
  }

  revalidatePath("/dashboard/blogs/blog-category");

  return { success: true, data: responseData };
}

async function updateBlogCategory(id: string, data: { name?: string; description?: string }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const headersOptions = {
    "Content-Type": "application/json",
    ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
  };
  const res = await fetch(`${envVariables.NEXT_PUBLIC_API_URL}/blog-categories/${id}`, {
    method: "PATCH",
    headers: headersOptions,
    credentials: "include", // This should send cookies
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    return { success: false, error: `HTTP error! status: ${res.status}`, details: errorData };
  }

  const responseData = await res.json();

  revalidatePath("/dashboard/blogs/blog-category");

  return { success: true, data: responseData };
}

async function deleteBlogCategory(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const headersOptions = {
    "Content-Type": "application/json",
    ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
  };
  const res = await fetch(`${envVariables.NEXT_PUBLIC_API_URL}/blog-categories/${id}`, {
    method: "DELETE",
    headers: headersOptions,
    credentials: "include", // This should send cookies
  });

  if (!res.ok) {
    const errorData = await res.json();
    return { success: false, error: `HTTP error! status: ${res.status}`, details: errorData };
  }
  revalidatePath("/dashboard/blogs/blog-category");

  return { success: true };
}

//  get all categories
async function getAllBlogCategories() {
  const res = await fetch(`${envVariables.NEXT_PUBLIC_API_URL}/blog-categories`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    return { success: false, error: `HTTP error! status: ${res.status}` };
  }

  const data = await res.json();
  return data;
}

export { createBlogCategory, updateBlogCategory, deleteBlogCategory, getAllBlogCategories };
