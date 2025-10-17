"use server";
import envVariables from "@/config/env";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// * create project function
export async function createProject(data: {
  title: string;
  shortDescription: string;
  projectDetails: string;
  liveLink: string;
  frontendLink: string;
  backendLink?: string;
  altText: string;
  video?: string;
  category: "FullStack" | "Frontend";
  technologies: string[];
  photo: File;
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
      shortDescription: data.shortDescription,
      projectDetails: data.projectDetails,
      liveLink: data.liveLink,
      frontendLink: data.frontendLink,
      backendLink: data.backendLink,
      altText: data.altText,
      category: data.category,
      technologies: data.technologies,
      video: data.video,
    })
  );
  formData.append("photo", data.photo);

  const res = await fetch(`${envVariables.NEXT_PUBLIC_API_URL}/projects`, {
    method: "POST",
    headers: headersOptions,
    body: formData,
  });

  const responseData = await res.json();

  if (!res.ok) {
    return { success: false, error: `HTTP error! status: ${res.status}`, details: responseData };
  }

  revalidatePath("/dashboard/project/all");
  revalidatePath("/projects");

  return { success: true, data: responseData.data };
}

// * get all projects function
export async function getAllProjects() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const headersOptions = {
    "Content-Type": "application/json",
    ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
  };

  const res = await fetch(`${envVariables.NEXT_PUBLIC_API_URL}/projects`, {
    method: "GET",
    headers: headersOptions,
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    return { success: false, error: `HTTP error! status: ${res.status}` };
  }

  const responseData = await res.json();
  return { success: true, data: responseData.data };
}

// * get project by id function
export async function getProjectById(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const headersOptions = {
    "Content-Type": "application/json",
    ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
  };

  const res = await fetch(`${envVariables.NEXT_PUBLIC_API_URL}/projects/${id}`, {
    method: "GET",
    headers: headersOptions,
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    return { success: false, error: `HTTP error! status: ${res.status}` };
  }

  const responseData = await res.json();
  return { success: true, data: responseData.data };
}

// * delete project function
export async function deleteProject(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const headersOptions = {
    "Content-Type": "application/json",
    ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
  };

  const res = await fetch(`${envVariables.NEXT_PUBLIC_API_URL}/projects/${id}`, {
    method: "DELETE",
    headers: headersOptions,
  });

  if (!res.ok) {
    return { success: false, error: `HTTP error! status: ${res.status}` };
  }

  revalidatePath("/dashboard/project/all");
  revalidatePath("/projects");

  return { success: true };
}

// * update project function
export async function updateProject(
  id: string,
  data: {
    title?: string;
    shortDescription?: string;
    projectDetails?: string;
    liveLink?: string;
    frontendLink?: string;
    backendLink?: string;
    photo?: File | undefined;
    altText?: string;
    video?: string;
    category?: string;
    technologies?: string[];
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
      shortDescription: data.shortDescription,
      projectDetails: data.projectDetails,
      liveLink: data.liveLink,
      frontendLink: data.frontendLink,
      backendLink: data.backendLink,
      altText: data.altText,
      category: data.category,
      technologies: data.technologies ? data.technologies.map((tag: string) => tag.trim()) : undefined,
      video: data.video,
      deletePhoto: data.deletePhoto,
    })
  );
  if (data.photo) {
    formData.append("photo", data.photo);
  }

  const res = await fetch(`${envVariables.NEXT_PUBLIC_API_URL}/projects/${id}`, {
    method: "PATCH",
    headers: headersOptions,
    body: formData,
  });

  const responseData = await res.json();

  if (!res.ok) {
    return { success: false, error: `HTTP error! status: ${res.status}`, details: responseData };
  }

  revalidatePath("/dashboard/project/all");
  revalidatePath("/projects");

  return { success: true, data: responseData.data };
}
