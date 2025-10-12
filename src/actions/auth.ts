"use server";

import envVariables from "@/config/env";
import setAccessToken from "@/service/SetAccessToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (data: {
  email: string;
  password: string;
}): Promise<{ success: boolean; error?: string; message?: string } | void> => {
  console.log(data);

  try {
    const res = await fetch(`${envVariables.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();
    // console.log(responseData);

    // Check if the response was successful
    if (!res.ok) {
      return {
        success: false,
        error: responseData.message || `HTTP error! status: ${res.status}`,
      };
    }

    console.log(responseData.data.accessToken);

    // Set the access token (this will redirect to dashboard)
    await setAccessToken(responseData.data.accessToken, "accessToken");

    // This line will never be reached due to redirect in setAccessToken
  } catch (error) {
    // Check if it's a NEXT_REDIRECT error (which is expected and should be allowed)
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.includes("NEXT_REDIRECT")
    ) {
      // This is expected - redirect is happening, so re-throw it
      throw error;
    }

    console.error("Login error:", error);
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
};
