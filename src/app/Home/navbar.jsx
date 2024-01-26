import React, { useRef } from 'react'
import { useRouter } from "next/navigation";
import WritePost from "../../image/write.png";
import { useState ,useEffect} from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import Link from "next/link";

const Navbar = ({navFlag,handleChange}) => {
  const [showProfile, setShowProfile] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const router = useRouter();
  const ref = useRef()
  const [user, setUser] = useState({});
  useEffect(() => {
    const userData = sessionStorage["user"];
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLoginClick = (e) => {
    e.preventDefault();
    const checkBtn = e.target.value;
    checkBtn === "login"
      ? router.push("/auth/signIn")
      : router.push("/auth/signUp");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
          setDropDown(false)
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (user._id) {
      setShowProfile(true)
    }
  }, [user]);

  const goToHome = () => {
    router.push("/Home");
  };

  const search = (e) => {
    handleChange({ key: e.target.value, searchMode: true });
  }
  const showDropDown = () => {
    setDropDown(!dropDown);
  };

  const logout = () =>{
    Swal.fire({
      text: "Do you want to Logout",
      icon : "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#888e91",
      confirmButtonText: "Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/auth/signIn')
        sessionStorage.clear()
      }
    });
  }
 
  return (
    <div className="flex justify-between items-center w-full py-4 px-10 border-b border-gray-300">
      <div className="flex">
        <span
          className="text-3xl font-bold mr-10 cursor-pointer"
          onClick={goToHome}
        >
          My Blog
        </span>
        <div className="container-input">
          <input
            type="text"
            placeholder="Search"
            name="text"
            className="input"
            onChange={search}
          />
          <svg
            fill="#000000"
            width="20px"
            height="20px"
            viewBox="0 0 1920 1920"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
              fillRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>

      {showProfile ? (
        <div className="px-6 mt-3 text-center flex items-center">
          <Link className="flex cursor-pointer" href={`../admin-dashboard/${user._id}`}>
            <Image
              src={WritePost}
              className="w-5 h-5 mr-2"
              width={0}
              height={0}
              alt="write post"
            ></Image>
            Write Post
          </Link>
          {/* Noti */}
          <button className="button ml-5 cursor-pointer">
            <svg viewBox="0 0 448 512" className="bell">
              <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path>
            </svg>
          </button>
          <div className="cursor-pointer">
            <Image
              src={user.image}
              alt="userprofile"
              width={0}
              height={0}
              className="rounded-full ml-5 w-11 h-11"
              onClick={showDropDown}
            ></Image>
            {dropDown && (
              <div
                ref={ref}
                id="dropdown"
                className="z-10 absolute right-5 mt-3 w-32 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li onClick={()=>{router.push(`/profile/${user._id}`)}}>
                    <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      View Profile
                    </a>
                  </li>
                  <li onClick={logout}>
                    <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="px-6 mt-3 text-center">
          <button
            className="bg-gray-600 px-6 py-1 text-white rounded-md"
            value="login"
            onClick={handleLoginClick}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
