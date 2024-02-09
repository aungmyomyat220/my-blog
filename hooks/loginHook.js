import { useMutation, useQuery } from '@tanstack/react-query'
import {Login} from "../api/api";

export const loginHook = (checkUser) => {
    return useMutation({
        mutationKey: ["Login",checkUser],
        mutationFn :() => Login(checkUser),
    })
}