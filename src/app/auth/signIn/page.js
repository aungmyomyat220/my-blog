"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { loginHook } from "../../../../hooks/loginHook";
import LoginBanner from "../../../image/undraw_font_re_efri.svg";
import Image from "next/image";
import SignUp from "../signUp/page";

const Page = () => {
  const router = useRouter();
  const [signUp, setSignUp] = useState(false);
  const [checkUser, setCheckUser] = useState({
    userEmail: "",
    password: "",
  });
  const {mutateAsync:Login,isLoading} = loginHook(checkUser)
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
    e.preventDefault();
    try {
      if(checkUser.userEmail === "" && checkUser.password === ""){
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Enter Username and Password",
          showConfirmButton: true,
          timer: null,
        });
        return false;
      }
      const response = await Login(checkUser)
      if (response.statusCode === 200) {
        sessionStorage.setItem("user", JSON.stringify(response.user));
        await Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1000,
        });
        router.push("/Home");
      } else if (response.statusCode === 404) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "User Not Found",
          showConfirmButton: true,
          timer: null,
        });
      } else if (response.statusCode === 401) {
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
          <div
            className={`sm:w-1/2 flex justify-center transition-all duration-500`}
          >
            <Image
              src={LoginBanner}
              width={900}
              height={1500}
              alt="loginbanner"
              className={"hidden sm:block"}
            ></Image>
          </div>
          {signUp ? (
            <div
              className={`sm:w-1/2 w-full bg-white rounded-lg flex flex-col items-center justify-center transition-all duration-500`}
            >
              <SignUp onchange={handleChildStateChange}></SignUp>
            </div>
          ) : (
            <div
              className={`sm:w-1/2 w-full bg-white rounded-lg flex flex-col items-center justify-center transition-all duration-500 order-2`}
            >
              <div className="font-bold sm:text-3xl text-4xl">
                Welcome back!
              </div>
              <div className="mt-2 text-xs">Please enter your details</div>
              <div className="mt-12">
                <div className="relative h-11 w-80 ">
                  <input
                    placeholder="example@gmail.com"
                    name="userEmail"
                    required
                    onChange={handleInputChange}
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                    type="email"
                  />
                  <label
                    className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Email
                  </label>
                </div>
                <div className="relative h-11 w-80 mt-4">
                  <input
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleSubmit(event);
                      }
                    }}
                    placeholder="123456"
                    type="password"
                    name="password"
                    required
                    onChange={handleInputChange}
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  />
                  <label
                    className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Password
                  </label>
                </div>
                <div
                  className="text-gray-400 text-xs mt-3 flex justify-end cursor-pointer hover:text-black"
                  onClick={() => {
                    router.push("/auth/reset");
                  }}
                >
                  Forgot password?
                </div>

                {isLoading?
                <div
                  className="w-80 bg-black mt-5 py-2 rounded-full flex justify-center cursor-pointer"
                >
                  <button className="rounded-sm font-bold text-white">
                    <svg aria-hidden="true"
                         className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"/>
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"/>
                    </svg>
                  </button>
                </div>
                  :
                  <div
                    className="w-80 bg-black mt-5 py-2 rounded-full flex justify-center cursor-pointer"
                    onClick={handleSubmit}
                  >
                    <button className="rounded-sm font-bold text-white">
                      Login
                    </button>
                  </div>
                }
                <div className="text-sm text-center mt-6">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Don't have an account?
                  <span
                    className="cursor-pointer font-bold"
                    onClick={() => {
                      setSignUp(true);
                    }}
                  >
                    {" "}
                    Sign Up
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
