import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const updatePostHook = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryClient = useQueryClient();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation(
        async ({Id,updateData}) => {
          return await axios.patch(`/posts/${Id}`, updateData);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("getAllPost")
            },
        }
    );
};