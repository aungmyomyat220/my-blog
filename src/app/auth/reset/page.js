"use client";
import React, {useState} from "react";
import emailjs from "emailjs-com";
import {checkUserExist, updateUser} from "../../../../api/api";
import Swal from "sweetalert2";
import {useRouter} from "next/navigation";

emailjs.init("IxTBYliB_BO-f_J1-");
const Page = () => {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const [randomNumber, setRandomNumber] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [error, setError] = useState(false);
  const [letChangePassword, setLetChangePassword] = useState(false);

  function getRandomSixDigitNumber() {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  }

  const handleSubmit = async () => {
    const response = await checkUserExist(email);
    if (response.statusCode === 404) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "User Not Found",
        showConfirmButton: true,
        timer: null,
      });
    }
    else if (response.statusCode === 200 || 201) {
      setUserId(response.userId)
      const randomSixDigitNumber = getRandomSixDigitNumber();
      setRandomNumber(randomSixDigitNumber);
      const emailData = {
        reset_email: email,
        name: email.substring(0, email.indexOf("@")),
        reset_code: randomSixDigitNumber,
      };

      emailjs
        .send("service_tmnbpb6", "template_nbh6d85", emailData)
        .then((response) => {
          setIsSuccess(true);
          setShow(true);
          console.log("Email sent successfully:", response);
          setTimeout(() => {
            setRandomNumber("");
          }, 60000);
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
    }
    else{

    }
  };

  const checkResetCode = () => {
    if (resetCode === randomNumber.toString()) {
      setChangePassword(true);
    } else if (randomNumber.toString() === "") {
      setError(true);
    }
  };

  const changePasswordFun = async () => {
    if (newPassword !== confirmPassword) {
      setLetChangePassword(true);
    } else if (newPassword === confirmPassword) {
      setLetChangePassword(false);
      const updateCategory = "password";
      const updateData = newPassword
      const requestData = {
        updateData,
        updateCategory
      };

      try {
        const result = await updateUser(requestData, userId);
        if(result.statusCode === 200){
          await Swal.fire({
            icon: "success",
            title: "Success",
            text: "Password Successfully Changed",
            showConfirmButton: false,
            timer: 2000,
          });
          router.push('/auth/signIn')
        }
        else
          console.log(error)
      } catch (error) {
        console.error("Error updating password:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        {changePassword ? (
          <>
            <h2
              className={`text-2xl font-semibold ${
                letChangePassword ? "mb-2" : "mb-6"
              }`}
            >
              Reset Password
            </h2>
            {letChangePassword && (
              <span className={"text-red-500 text-sm"}>
                Password and confirm password does not match
              </span>
            )}
            <div className="my-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-600"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="mt-1 p-2 w-full border rounded-md"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-600"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 p-2 w-full border rounded-md"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="button"
              onClick={changePasswordFun}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Change Password
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>
            {isSuccess ? (
              <>
                {error ? (
                  ""
                ) : (
                  <div className="text-green-600 mb-4">
                    ResetCode sent to your email address
                  </div>
                )}
                {show && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="resetCode"
                      className={`mt-1 ${
                        error ? "mb-1" : "mb-4"
                      } p-2 w-full border rounded-md`}
                      onChange={(e) => setResetCode(e.target.value)}
                      required
                    />
                    {error && (
                      <span
                        className={"text-red-500 text-sm flex flex-col mb-3"}
                      >
                        Your ResetCode is Expired!!
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={checkResetCode}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Verify
                    </button>
                  </div>
                )}
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 p-2 w-full border rounded-md"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Reset Password
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
