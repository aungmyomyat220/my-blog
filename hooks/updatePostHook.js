import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const updatePostHook = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async ({Id,updateData}) => {
          return await axios.patch(`${API_BASE_URL}/posts/${Id}`, updateData,{
              headers: {
                  "API_KEY" : apiKey
              }
          });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("getAllPost")
            },
        }
    );
};