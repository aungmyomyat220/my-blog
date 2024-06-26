'use client'
import React, { useState, useRef, useEffect } from 'react'
import { checkVerificationCode, createUserHook } from '../../../../hooks/createUserHook'
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const { mutateAsync: checkCode, isLoading, isError } = checkVerificationCode();
  const { mutateAsync: createUser, creatingUser } = createUserHook();
  const [inputs, setInputs] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    setEmail(email)
  }, [])

  const handleClick = async() => {
    let verifyCode = "";
    inputs.map(n=>{
      verifyCode += n.toString()
    })
    if (verifyCode !== ""){
      const res = await checkCode(verifyCode);
      console.log(res)
      if(res.statusCode === 201){
        await Swal.fire({
          icon: "success",
          title: "Account created Successfully",
          showConfirmButton: false,
          timer: 1000,
        });
        router.push("/auth/signIn");
      }else if(res.statusCode === 400){
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Verification Code does not match",
          showConfirmButton: true,
          timer: null,
        });
      }
    }
  }

  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    // Move focus to the next input
    if (value && index < inputs.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('Text');
    const pasteValues = pasteData.split('').slice(0, inputs.length);
    const newInputs = [...inputs];
    pasteValues.forEach((value, index) => {
      newInputs[index] = value;
    });
    setInputs(newInputs);
  };

  return (
    <div className={'w-full h-screen flex justify-center items-center bg-gray-100'}>
      <div className={`w-full h-[600px] flex flex-col p-8 items-center max-w-xl bg-white shadow-xl`}>
        <span className={'text-2xl border-b border-gray-300 px-10 pb-5 text-gray-500'}>Verify Your Email Address</span>
        <span className={'mt-10'}>A verification code has been sent to</span>
        <span className={'font-bold'}>{email}</span>
        <span className={'px-10 mt-14'}>
          Please check your inbox and enter the verification
          code below to verify your email address. The code
          will expire after 3 minutes
        </span>
        <div className={'mt-8'}>
          {inputs.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              pattern="[0-9]"
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onPaste={handlePaste}
              className={`outline outline-0 w-10 h-10 text-center mx-1 border border-gray-300 focus:border-2 focus:border-green-500 ${
                value && 'border-2 border-green-500'
              }`}
              ref={(inputRef) => (inputRefs.current[index] = inputRef)}
            />
          ))}
        </div>
        <div>
          <button className={'bg-green-500 hover:bg-green-600 text-white py-3 px-32 mt-6 rounded-lg cursor-pointer'} onClick={handleClick}>
            {isLoading ?
                <svg aria-hidden="true"
                     className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"/>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"/>
                </svg>
                  : 'Verify'
            }
          </button>
        </div>
        <div className={'flex justify-between text-green-500 w-full px-32 mt-5 font-medium cursor-pointer'}>
          <span>Resend Email</span>
          <span onClick={() => {router.back()}}>Change Email</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
