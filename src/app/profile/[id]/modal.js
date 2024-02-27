import React, { useEffect, useRef, useState } from 'react'
import Image from "next/image";
import { updateUserHook } from '../../../../hooks/updateUserHook'
const Modal = ({userData}) => {
  const [image, setImage] = useState("");
  const fileInputRef = useRef(null);
  const { mutateAsync: updateUserBio } = updateUserHook()
  const [email,setEmail] = useState(userData.userEmail)
  const [userName,setUserName] = useState(userData.userName)
  const [userBio, setUserBio] = useState({
    companyName: userData.userBio.companyName,
    mainLanguage: userData.userBio.mainLanguage,
    experience: userData.userBio.experience
  })

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setUserBio((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  console.log(userBio)

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

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const updateUser = () => {

  }

  return (
    <div className={'flex justify-start ml-5 mt-5'}>
      <button className={'rounded-lg px-3 py-2 bg-blue-500 text-white hover:bg-blue-600'}
              onClick={() => document.getElementById('my_modal_3').showModal()}>Edit Profile
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>{setImage("")}}>✕</button>
          </form>
          <h3 className="font-bold text-2xl">Edit Your Profile</h3>
          <p className="py-4">Make changes to your profile here. Click save when you're done.</p>

          <div className={'justify-center items-center mt-3 ml-5'}>
            <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-1">
                Profile Picture
              </label>
              <div>
                <input
                  accept="image/jpeg, image/png"
                  type="file"
                  id="fileInput"
                  onChange={convertToBase64}
                  style={{ display: 'none' }}
                />
                {image == null || image === '' ? (
                  <Image
                    src={userData.image}
                    alt="ImagePicker"
                    className="w-16 h-16 rounded-full"
                    width={0}
                    height={0}
                    onClick={handleImageClick}
                  ></Image>
                ) : (
                  <>
                    <Image
                      src={image}
                      alt="Selected"
                      width="300"
                      className="w-16 h-16 rounded-full"
                      height={0}
                      onClick={handleImageClick}
                    />
                  </>
                )}
              </div>
              <input
                type="file"
                name="image"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <div className={'grid grid-cols-6 justify-center items-center mt-8'}>
            <span className={'col-span px-5 text-right'}>UserName</span>
            <span className={'col-span-5 text-left px-10'}>
              <input type="text" name='userName' value={userName} onChange={(e)=>{setUserName(e.target.value)}} className={'outline outline-0 border border-black px-3 py-1 rounded-md w-full'}/>
            </span>
          </div>

          <div className={'grid grid-cols-6 justify-center items-center mt-5'}>
            <span className={'col-span px-5 text-right'}>Email</span>
            <span className={'col-span-5 text-left px-10'}>
              <input type="email" disabled={true} value={email} onChange={(e)=>{setUserName(e.target.value)}}
                     className={'outline outline-0 border border-black px-3 py-1 rounded-md w-full'}/>
            </span>
          </div>

          <div className={'grid grid-cols-6 justify-center items-center mt-5'}>
            <span className={'col-span px-5 text-right'}>Company</span>
            <span className={'col-span-5 text-left px-10'}>
              <input type="text" name='companyName' value={userBio.companyName} onChange={handleInputChange}
                     className={'outline outline-0 border border-black px-3 py-1 rounded-md w-full'}/>
            </span>
          </div>

          <div className={'grid grid-cols-6 justify-center items-center mt-5'}>
            <span className={'col-span px-5 text-right'}>Language</span>
            <span className={'col-span-5 text-left px-10'}>
                <input type="text" name='mainLanguage' value={userBio.mainLanguage} onChange={handleInputChange}
                       className={'outline outline-0 border border-black px-3 py-1 rounded-md w-full'}/>
            </span>
          </div>

          <div className={'grid grid-cols-6 justify-center items-center mt-5'}>
            <span className={'col-span px-5 text-right'}>Experience</span>
            <span className={'col-span-5 text-left px-10'}>
              <input type="text" name='experience' value={userBio.experience} onChange={handleInputChange}
                     className={'outline outline-0 border border-black px-3 py-1 rounded-md w-full'}/>
            </span>
          </div>

          <div className={'grid grid-cols-6 justify-center items-center mt-5'}>
            <span className={'col-span px-5'}></span>
            <span className={'col-span-5 text-end px-10'}>
              <button className={'rounded-md bg-black py-2 px-3 text-white'} onClick={updateUser}>Saves Changes</button>
            </span>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Modal