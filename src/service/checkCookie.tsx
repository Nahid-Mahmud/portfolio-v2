"use server";

import { cookies } from "next/headers";

const checkCookie = async (name: string) => {
  const cookie = (await cookies()).get(name);
  return cookie ? cookie.value : null;
};

export default checkCookie;
