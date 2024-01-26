import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
export const updateUserHook = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryClient = useQueryClient()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation(
      async ({Id,updateData}) => {
          return await axios.put(`https://my-blog-beta-green.vercel.app/users/${Id}`, updateData);
      },
      {
          onSuccess: () => {
              queryClient.invalidateQueries("getAllUser")
          },
      }
    );
};
