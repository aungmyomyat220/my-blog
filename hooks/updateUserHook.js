import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const updateUserHook = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryClient = useQueryClient()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation(
      async ({Id,updateData}) => {
          return await axios.put(`http://localhost:8000/users/${Id}`, updateData, {
              headers: {
                  "API_KEY": apiKey
              }
          });
      },
      {
          onSuccess: () => {
              queryClient.invalidateQueries("getAllUser")
          },
      }
    );
};
