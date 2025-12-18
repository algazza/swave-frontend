export const useLogout = () => {
  const router = useRouter();

  return () => {
    const token = useCookie("token");
    const user = useCookie("user");

    token.value = null;
    user.value = null;

    router.push("/login");
  };
};
