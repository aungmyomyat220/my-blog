import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const createUserHook = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      return await axios.get(`${API_BASE_URL}/createUsers`,{
        headers: {
          'Content-Type': 'application/json',
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

export const checkVerificationCode = () => {
  return useMutation(
      async (verifyCode) => {
        const response = await fetch(`${API_BASE_URL}/checkVerificationCode`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': true,
            'API_KEY': apiKey
          },
          body: JSON.stringify({ code: verifyCode })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      }
  );
};

export const checkDuplicateUser = () => {
  return useMutation(
    async (email) => {
      try {
        const response = await fetch(`${API_BASE_URL}/checkDuplicateUser`, {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": true,
            "Content-Type": "application/json",
            "API_KEY" : apiKey
          },
          body: JSON.stringify({email}),
        });
        if (response.ok) {
          return await response.json();
        } else {
          console.error("Error creating post:", response.statusText);
          return { error: response.statusText };
        }
      } catch (error) {
        console.error("Error creating post:", error);
        throw error;
      }
    },
  );
};