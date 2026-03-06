import type { UserType } from "~/types/user";

export const useAuthUser = () => {
    const user = useCookie<UserType | null>('user')
    return user.value
}