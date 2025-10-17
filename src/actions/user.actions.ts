"use server";
import envVariables from "@/config/env";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const getMyProfile = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const headersOptions = {
    "Content-Type": "application/json",
    ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
  };

  const res = await fetch(`${envVariables.NEXT_PUBLIC_API_URL}/user/me`, {
    method: "GET",
    headers: headersOptions,
  });

  if (!res.ok) {
    return { success: false, error: `HTTP error! status: ${res.status}` };
  }

  const responseData = await res.json();
  return { success: true, data: responseData.data };
};

export const updateMyProfile = async (data: {
  bio?: string;
  photo?: File | undefined;
  deletePhoto?: string | undefined;
}) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const headersOptions = {
    ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
  };

  const formData = new FormData();

  formData.append(
    "data",
    JSON.stringify({
      bio: data.bio,
      deletePhoto: data.deletePhoto,
    })
  );

  if (data.photo) {
    formData.append("photo", data.photo);
  }

  const res = await fetch(`${envVariables.NEXT_PUBLIC_API_URL}/user/profile`, {
    method: "PUT",
    headers: headersOptions,
    body: formData,
  });

  if (!res.ok) {
    return { success: false, error: `HTTP error! status: ${res.status}` };
  }

  // console.log(await res.json());

  const responseData = await res.json();
  revalidatePath("/dashboard/profile");
  return { success: true, data: responseData.data };
};
