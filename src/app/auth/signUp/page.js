'use client'
import React, {useEffect, useRef, useState} from 'react';
import { useRouter } from "next/navigation";
import { createUser } from "../../../../api/api";
import Image from "next/image";
import ImagePicker from "@/image/plus.jpg";
import Swal from "sweetalert2";

const Page = ({onchange}) => {
    const [error, setError] = useState("");
    const [image,setImage]= useState("")
    const router = useRouter()
    const [user, setUser] = useState({
        "userName": "",
        "userEmail": "",
        "password": "",
        "confirmPassword": "",
        "followers" : [{
            followerId : ""
        }],
        "image" : image,
        userBio : {
            companyName : "",
            mainLanguage : "",
            experience : "",
        }
    });

    const fileInputRef = useRef(null);
    const convertToBase64 = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = (error) => {
            console.log("Error", error);
        };
    };

    useEffect(() => {
        setUser((prevUser) => ({
            ...prevUser,
            image: image,
        }));
    }, [image]);

    const handleInputChange = (e) => {
        const { value, name} = e.target;
            setUser((prevUser) => ({
                ...prevUser,
                [name]: value,
            }))
    };

    const handleImageClick = () => {
        document.getElementById('fileInput').click();
    };

    const backToSignIn = (param) => {
        onchange(param)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        // Check if any of the required fields are blank
        if (!user.userName || !user.userEmail || !user.password || !user.confirmPassword) {
            setError("Please fill in all the required fields.");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(user.userEmail)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (user.password.length<5) {
            setError("Please Enter password at least 5 digits");
            return;
        }

        if (user.password !== user.confirmPassword) {
            setError("Password and Confirm Password do not match.");
            return;
        }

        try {
            const response = await createUser(user);
            if(response.statusCode === 409){
                await Swal.fire({
                    icon: 'error',
                    title: 'Registered User',
                    text: 'Email already registered',
                    showConfirmButton: true,
                    timer: null,
                });
            }else if(response.statusCode === 200 || 201){
                await Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Account Successfully Created',
                    showConfirmButton: false,
                    timer: 2000,
                });
                setError("");
                onchange(false);
            }
        } catch (error) {
            console.log(error)

        }
    };

    useEffect(() => {
        router.prefetch('auth/signIn');
    }, [router]);

    return (
        <div>

                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <div className="font-bold text-3xl text-center mb-6">Hello There</div>
                        <div>
                            {error && <div className="text-red-500 mb-3">{error}</div>}
                                <div className="mb-3">
                                    <label className="block text-gray-700 font-medium mb-1">Profile Picture</label>
                                    <div>
                                        <input
                                            accept="image/*"
                                            type="file"
                                            id="fileInput"
                                            onChange={convertToBase64}
                                            style={{ display: 'none' }}
                                        />
                                        {image == null || image === '' ? (
                                            <Image src={ImagePicker} alt="ImagePicker" className="w-16 h-16" width={0} height={0} onClick={handleImageClick}></Image>
                                        ) : (
                                            <>
                                                <Image src={image} alt="Selected" width="300" className="w-16 h-16 rounded-full" height={0} onClick={handleImageClick} />
                                            </>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleInputChange}
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                    />
                                </div>

                            <div className="relative h-11 w-80 ">
                                <input
                                    placeholder="Eg : Aung Myo Myat"
                                    name="userName" required
                                    onChange={handleInputChange}
                                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                    type="text"
                                />
                                <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Name
                                </label>
                            </div>

                            <div className="relative h-11 w-80 mt-4">
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

                            <div className="relative h-11 w-80 mt-4">
                                <input
                                    placeholder="123456"
                                    type="password"
                                    name="confirmPassword" required
                                    onChange={handleInputChange}
                                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Confirm Password
                                </label>
                            </div>

                            <div className="w-80 bg-black mt-8 py-2 rounded-full flex justify-center cursor-pointer" onClick={handleClick}>
                                <button className="rounded-sm font-bold text-white">
                                    SignUp
                                </button>
                            </div>
                            <div className="text-sm text-center mt-6">
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                Already have an account?<span className="cursor-pointer font-bold" onClick={()=>{backToSignIn(false)}}> Sign In</span>
                            </div>

            </div>
        </div>
    );
};

export default Page;
