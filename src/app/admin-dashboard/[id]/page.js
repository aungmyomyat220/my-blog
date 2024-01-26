"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import imagePicker from "../../../image/noun-image-1066765.png";
import { createPost } from "../../../../api/api";
import Swal from "sweetalert2";
import Close from "../../../image/close-button.png"
import {useRouter} from "next/navigation";
import {updatePostHook} from "../../../../hooks/updatePostHook";

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
  const {mutateAsync} = updatePostHook()

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    author: user.userName,
    authorId: user._id,
    authorImage : user.image,
    date: new Date(),
    image : image,
    like : '',
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
      <div className="flex flex-col w-full h-screen items-center mt-10">
        <div className="w-full flex flex-col max-w-7xl justify-center items-center">
          <div className="w-full flex justify-between">
            <span className="font-bold text-5xl cursor-pointer" onClick={()=> {router.push('/Home')}}>My Blog</span>
            <div>
              {updateMode ?
                  <button
                      className="bg-green-600 text-white rounded-full px-3 py-1 mr-3"
                      onClick={postUpdate}
                  >
                    Update
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
              className="hover:border-transparent focus:border-transparent outline-none px-4 text-5xl"
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
                      className="hover:border-transparent focus:border-transparent outline-none px-4 text-xl"
                      placeholder="Tell Your Story"
                      name="content"
                      value={postData.content}
                      onClick={() => setShowButton(true)}
                      onChange={handleInputChange}
                      rows={100}
                      cols={90}
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
