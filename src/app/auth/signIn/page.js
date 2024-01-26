"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Login } from "../../../../api/api";
import LoginBanner from '../../../image/undraw_font_re_efri.svg'
import Image from "next/image";
import SignUp from '../signUp/page'

const Page = () => {
  const router = useRouter();
  const [signUp ,setSignUp] = useState(false)
  const [checkUser, setCheckUser] = useState({
    userEmail: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckUser((prevCheckUser) => ({
      ...prevCheckUser,
      [name]: value,
    }));
  };

  const handleChildStateChange = (childState) => {
    setSignUp(childState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await Login(checkUser);
      if (response.statusCode === 200) {
        sessionStorage.setItem("user", JSON.stringify(response.user));
        await Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1000,
        });
        router.push("/Home");
      }else if(response.statusCode === 404){
        await Swal.fire({
          icon: "warning",
          title: "Attention",
          text: "Fill the required fields",
          showConfirmButton: true,
          timer: null,
        });
      }
      else if (response.statusCode === 401) {
        await Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid username or password",
          showConfirmButton: true,
          timer: null,
        });
      }
    } catch (error) {
      console.error("Error authenticating user", error);
    }
  };

  return (
      <>
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <div className="max-w-5xl bg-gray-300 w-full h-[600px] rounded-xl flex p-2">

          <div className={`w-1/2 flex justify-center transition-all duration-500`}>
            <Image src={LoginBanner} width={900} height={1500} alt="loginbanner"></Image>
          </div>
          {signUp?

              <div className={`w-1/2 bg-white rounded-lg flex flex-col items-center justify-center transition-all duration-500`}>
              <SignUp onchange={handleChildStateChange}></SignUp>
                  </div>

              :
          <div className={`w-1/2 bg-white rounded-lg flex flex-col items-center justify-center transition-all duration-500 order-2`}>
            <div className="font-bold text-3xl">Welcome back!</div>
            <div className="mt-2 text-xs">Please enter your details</div>
            <div className="mt-12">
              <div className="relative h-11 w-80 ">
                <input
                  placeholder="example@gmail.com"
                  name="userEmail" required
                  onChange={handleInputChange}
                  className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  type="email"
                />
                <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Email
                </label>
              </div>
              <div className="relative h-11 w-80 mt-4">
                <input
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleSubmit(event)
                      }
                    }}
                  placeholder="123456"
                  type="password"
                  name="password" required
                  onChange={handleInputChange}
                  className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                />
                <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Password
                </label>
              </div>
              <div className="text-gray-400 text-xs mt-3 flex justify-end cursor-pointer hover:text-black" onClick={()=>{router.push('/auth/reset')}}>
                Forgot password?
              </div>
              <div className="w-80 bg-black mt-5 py-2 rounded-full flex justify-center cursor-pointer" onClick={handleSubmit}>
                <button className="rounded-sm font-bold text-white">
                  Login
                </button>
              </div>
              <div className="text-sm text-center mt-6">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Don't have an account?<span className="cursor-pointer font-bold" onClick={()=>{setSignUp(true)}}> Sign Up</span>
                </div>
            </div>
          </div>
          }
        </div>
      </div>
    </>
  );
};

export default Page;


