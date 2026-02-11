import { jwtDecode } from "jwt-decode";

export const isAdmin = (token: string | null) => {
  if (!token) {
    return false;
  }

  try {
    const decode = jwtDecode<{ role: string }>(token);
    return decode.role === "admin";
  } catch {
    return false;
  }
};
