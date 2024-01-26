import { useQuery } from "@tanstack/react-query";
import { getSpecificPost } from "../api/api";

export const getSpecificPostHook = (postId) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["getSpecificPost", postId],
    queryFn: () => getSpecificPost(postId),
  });
};
