import { jwtDecode } from "jwt-decode";
export default defineNuxtRouteMiddleware(() => {
  const token = useCookie("token");

  if (!token.value) {
    return navigateTo("/login");
  } else {
    const decode = jwtDecode<{ role: string }>(token.value);
    if (decode.role !== "admin") {
      return navigateTo("/");   
    }
  }
});
