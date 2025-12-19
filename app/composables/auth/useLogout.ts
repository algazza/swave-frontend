export const useLogout = () => {
  const router = useRouter();

  return () => {
    const token = useCookie("token");

    token.value = null

    router.push("/login");
  };
};
