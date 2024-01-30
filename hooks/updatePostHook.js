import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
// const apiKey = process.env.NEXT_PUBLIC_API_KEY;
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiKey = "927e0f9a-4451-4210-8dd1-eb47f8ca9089"
const API_BASE_URL = "https://my-blog-beta-green.vercel.app"
export const updatePostHook = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async ({Id,updateData}) => {
          return await axios.put(`${API_BASE_URL}/posts/${Id}`, updateData,{
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