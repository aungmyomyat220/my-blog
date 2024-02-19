import React, { useEffect } from 'react'
import { createUserHook } from '../../../hooks/createUserHook'
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter()
  const { mutateAsync: createUser, isLoading, isError } = createUserHook();
  const handleLoad = async() => {
    try{
      const response = await createUser(user)
      if (response.statusCode === 200 || 201) {
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Account Successfully Created",
          showConfirmButton: false,
          timer: 2000,
        });
      }}catch (e){
      console.log(e)
    }
    useEffect(() => {
      router.prefetch("auth/signIn");
    }, [router]);
  }
  return (
    <div onLoad={handleLoad}>
      Loading.......
    </div>
  )
}

export default Page