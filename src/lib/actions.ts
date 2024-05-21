"use server";

import { NextRequest } from "next/server";

export const isAuthenticated = (request: NextRequest) => {
  const customerAccessToken = request.cookies.get("customerAccessToken")?.value;
  return customerAccessToken;
};
