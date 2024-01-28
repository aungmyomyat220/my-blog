import { useQuery } from "@tanstack/react-query";
import { getSpecificPost } from "../api/api";

export const getSpecificPostHook = (postId) => {
  return useQuery({
    queryKey: ["getSpecificPost"],
    queryFn: () => getSpecificPost(postId),
  });
};
