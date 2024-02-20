'use client'
import React, { useEffect } from 'react'
import { createUserHook } from '../../../hooks/createUserHook'
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation";

const Page = () => {
  const user = React.useContext('MyContext')
  console.log("User",user)
  const router = useRouter()
  const { mutateAsync: createUser, isLoading, isError } = createUserHook();

  useEffect(() => {
    const handleLoad = async () => {
      console.log("Work")
      try {
        const response = await createUser(user)
        if (response.statusCode === 200 || response.statusCode === 201) {
          await Swal.fire({
            icon: "success",
            title: "Success",
            text: "Account Successfully Created",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (e) {
        console.log(e)
      }
      router.prefetch("auth/signIn");
    }

    handleLoad(); // Call handleLoad function when the component mounts

  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      Loading.......
    </div>
  )
}

export default Page
