'use client'
import React, { useEffect, useState, useRef } from 'react';
import { createUserHook } from '../../../../hooks/createUserHook';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const { mutateAsync: createUser, isLoading, isError } = createUserHook();
  const [inputs, setInputs] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    const handleLoad = async () => {
      try {
        const response = await createUser(user);
        if (response.statusCode === 200 || response.statusCode === 201) {
          await Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Account Successfully Created',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (e) {
        console.log(e);
      }
      router.prefetch('auth/signIn');
    };
    handleLoad();
  }, []);

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
      <div className={'w-full h-[600px] flex flex-col p-8 items-center max-w-xl bg-white shadow-xl'}>
        <span className={'text-2xl border-b border-gray-300 px-10 pb-5 text-gray-500'}>Verify Your Email Address</span>
        <span className={'mt-10'}>A verification code has been sent to</span>
        <span className={'font-bold'}>aungmyomyat@gmail.com</span>
        <span className={'px-10 mt-14'}>
          Please check your inbox and enter the verification
          code below to verify your email address. The code
          will expire in 14:48.
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
                value && 'border-blue-500'
              }`}
              ref={(inputRef) => (inputRefs.current[index] = inputRef)}
            />
          ))}
        </div>
        <div>
          <button className={'bg-green-500 hover:bg-green-600 text-white py-3 px-32 mt-6 rounded-lg cursor-pointer'}>Verify</button>
        </div>
        <div className={'flex justify-between text-green-500 w-full px-32 mt-5 font-medium cursor-pointer'}>
          <span>Resend Email</span>
          <span onClick={()=>{router.back()}}>Change Email</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
