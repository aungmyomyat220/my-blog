"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import imagePicker from "../../../image/noun-image-1066765.png";
import { createPost } from "../../../../api/api";
import Swal from "sweetalert2";
import Close from "../../../image/close-button.png"
import {useRouter} from "next/navigation";
import {updatePostHook} from "../../../../hooks/updatePostHook";
import { disabled } from 'express/lib/application'

const Page = () => {
  const [user, setUser] = useState({});
  const [error,setError] = useState("")
  const [image, setImage] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const ref = useRef()
  const router = useRouter()
  const {mutateAsync,isLoading:posting} = updatePostHook()

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    author: user.userName,
    authorId: user._id,
    authorImage : user.image,
    date: new Date(),
    image : image,
    like : [],
    delFlag : false,
    comment : []
  });

  useEffect(() => {
    const userData = sessionStorage["user"];
    if(sessionStorage["updatePostData"]){
      const storedPostData = JSON.parse(sessionStorage["updatePostData"]);
      if (storedPostData) {
        setUpdateMode(true)
        setPostData(storedPostData)
        setImage(storedPostData.image)
      }
    }
    sessionStorage.removeItem("updatePostData")
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    setPostData((prevPostData) => ({
      ...prevPostData,
      image: image,
    }));
  }, [image]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevPostData) => ({
      ...prevPostData,
      [name]: value,
      author: user.userName,
      authorId: user._id,
      authorImage : user.image,
      date: new Date(),
    }));
  };

  const postUpload = async () => {
    if (postData.title === "" || postData.title === undefined || postData.title === null ||
        postData.content === "" || postData.content === undefined || postData.content === null) {
      setError("Fill both Titles and Content");
      return false;
    }

    const response = await createPost(postData);
    if(response.status === 200 || 201){
      await Swal.fire({
        icon: "success",
        title: "Post Uploaded Successfully",
        showConfirmButton: false,
        timer: 1000,
      });
      setPostData({
        title: "",
        content: "",
      });
      setImage("")
      setIsRotated(false)
    }

  };

  const fileInputRef = useRef(null);
  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const buttonStyles = {
    transform: isRotated ? "rotate(45deg)" : "rotate(0deg)",
    transition: "transform 0.5s ease",
  };

  const showImage = () => {
    setShowText((prevShowText) => !prevShowText);
    setIsRotated(!isRotated);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowButton(false)
        setShowText(false);
        setIsRotated(false)
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [ref]);

  const postUpdate = async () => {
    if (postData.title === "" || postData.title === undefined || postData.title === null ||
      postData.content === "" || postData.content === undefined || postData.content === null) {
      setError("Fill both Titles and Content");
      return false;
    }
      const Id = postData._id
    const response = await mutateAsync({ Id, updateData:postData});
    if(response.status === 200 || 201){
      await Swal.fire({
        icon: "success",
        title: "Post Updated Successfully",
        showConfirmButton: false,
        timer: 1000,
      });
      setPostData({
        title: "",
        content: "",
      });
      setImage("")
      setIsRotated(false)
      router.push(`/posts/${postData._id}`);
    }
  }

  return (
    <>
      <div className="flex flex-col w-full h-screen items-center mt-10 px-2">
        <div className="w-full flex flex-col max-w-7xl justify-center items-center">
          <div className="w-full flex justify-between">
            <span className="font-bold text-5xl cursor-pointer" onClick={()=> {router.push('/Home')}}>My Blog</span>
            <div>
              {updateMode ?
                  <button
                      className={`bg-green-600 text-white rounded-full px-3 py-1 mr-3 ${posting && 'disabled'}`}
                      onClick={postUpdate}
                  >
                    {posting ?
                      <div role="status" className={'bg-blue-500 px-6 py-1 rounded-lg'}>
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
                        <span className="sr-only">Loading...</span>
                      </div> : "update"
                    }
                  </button> :
                <button
                  className="bg-green-600 text-white rounded-full px-3 py-1 mr-3"
                  onClick={postUpload}
                >
                  Publish
                </button>
              }
            </div>
          </div>
          <div className="max-w-4xl w-full mt-10 flex flex-col font-serif">
            <div className={'w-full text-red-500 text-left text-2xl mb-7'}>{error}</div>
            <input
              className="hover:border-transparent focus:border-transparent outline-none px-4 sm:text-5xl text-3xl"
              placeholder="Title"
              value={postData.title}
              name="title"
              onChange={handleInputChange}
            />
            <div ref={ref}>
              <div className="flex flex-row mt-4">
                <div>
                  {showButton && (
                    <button
                      className="rounded-full px-2 text-2xl border border-black"
                      style={buttonStyles}
                      onClick={showImage}
                    >
                      +
                    </button>
                  )}
                  {showText && (
                    <>
                    <span className="text-lg absolute bg-white ml-4 -mt-2 w-full">
                      <Image
                        src={imagePicker}
                        alt="picture"
                        className="w-14 h-12"
                        onClick={openFilePicker}
                        name="image"
                      />
                    </span>
                        <input
                            ref={fileInputRef}
                            name="image"
                            type="file"
                            style={{ display: "none" }}
                            onChange={convertToBase64}
                        />
                      </>
                  )}
                </div>
                <div className="flex flex-col">
                  {image?
                      <div className="w-full flex justify-center my-5">
                        <Image width={500} height={400} src={image} alt="preview" onClick={()=>{setShowButton(!showButton),setShowText(false),setIsRotated(false)}}></Image>
                        <div className='flex items-start ml-5'>
                          <Image src={Close}  alt='close button' height={30} width={30} onClick={()=>{setImage("")}}/>
                        </div>
                      </div> : ""
                  }

                  <textarea
                      className="pl-5 hover:border-transparent focus:border-transparent outline-none text-xl h-screen w-[350px] sm:w-[780px]"
                      placeholder="Tell Your Story"
                      name="content"
                      value={postData.content}
                      onClick={() => setShowButton(true)}
                      onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
