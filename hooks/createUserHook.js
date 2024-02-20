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

export const checkDuplicateUser = () => {
  return useMutation(
    async (email) => {
      console.log(email)
      try {
        const response = await fetch(`http://localhost:8000/checkDuplicateUser`, {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": true,
            "Content-Type": "application/json",
            "API_KEY" : apiKey
          },
          body: JSON.stringify({email}),
        });
        if (response.ok) {
          const data = await response.json(); // Await the response.json() call
          console.log("Response:", data); // Log the actual data received
          return data; // Return the data
        } else {
          console.error("Error creating post:", response.statusText);
          return { error: response.statusText }; // Return an error object
        }
      } catch (error) {
        console.error("Error creating post:", error);
        throw error; // Throw the error to be caught by the caller
      }
    },
  );
};