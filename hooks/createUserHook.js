import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const createUserHook = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (user) => {
      return await axios.post(`${API_BASE_URL}/users`, user,{
        headers: {
          "Access-Control-Allow-Origin": true,
          "API_KEY" : apiKey
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