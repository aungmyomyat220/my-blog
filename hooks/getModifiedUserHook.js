import { useQuery } from "@tanstack/react-query";
import { getModifiedUser } from "../api/api";

export const getModifiedUsersHook = (userId) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
        queryKey: ["getModifiedUser", userId], // Use a unique query key, including the userId
        queryFn: () => getModifiedUser(userId), // Call the function with userId
    });
};
