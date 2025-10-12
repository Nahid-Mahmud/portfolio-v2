"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const setAccessToken = async (token: string, name: string) => {
  (await cookies()).set(name, token);
  redirect("/dashboard");
};

export default setAccessToken;
