import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAllUsersHook } from "../../../../hooks/getAllUsersHook";
import Image from "next/image";
import {getModifiedUsersHook} from "../../../../hooks/getModifiedUserHook";
import {updateUserHook} from "../../../../hooks/updateUserHook";

const Sidebar = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const {mutateAsync} = updateUserHook()
  const { data: users = [] } = getAllUsersHook();
  const [alreadyFollow,setAlreadyFollow] = useState([])
  const viewedUser = users.filter((user) => user._id === id);
  const confirmUser = viewedUser[0];
  const router = useRouter();
  const follower = users.filter((user) =>
    confirmUser.followers.includes(user._id)
  );
  useEffect(() => {
    const userData = sessionStorage["user"];
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  const Id = user._id
  const { data, isLoading, error } = getModifiedUsersHook(Id);

  useEffect(() => {
    if (!isLoading && !error) {
      const initialFollowers = data.followers;
      setAlreadyFollow(initialFollowers);
    }
  }, [data]);

  const handleFollow = () => {
    const Id = user._id
    if (!alreadyFollow.includes(id)){
      setAlreadyFollow((prevState)=>{
        const updated = [...prevState,id]
        const updateData = {
          followers : updated
        };
        mutateAsync({ Id, updateData });
        return updated
      })
    }
    else if(alreadyFollow.includes(id)){
      const updated = alreadyFollow.filter(item => item !== id);
      const updateData = {
        followers: updated
      };
      mutateAsync({ Id, updateData});
    }
  }

  return (
    <div>
      <div className="pt-14 flex flex-col pl-10">
        {confirmUser && (
          <>
            <Image
              src={confirmUser.image}
              alt="profile"
              className="rounded-full w-32 h-32"
              width={0}
              height={0}
            />
            <span className="text-black font-bold text-xl mt-5 mb-2">
              {confirmUser.userName || "Guest"}
            </span>
          </>
        )}
        <span className="text-gray-500">
          {follower.length} Follower{follower.length > 1 && "s"}
        </span>

        {confirmUser && confirmUser._id === user._id ? (
          ""
        ) : (
          <>
            {/* Follow Button and Mail */}
            <div className="flex mt-5">
              <span className="mr-3" onClick={handleFollow}>
                <div className="tooltip-container">
                  <span className="tooltip">{follower.length}</span>
                  <span
                    className="text"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 95 114"
                      className="svgIcon"
                    >
                      <rect
                        fill="black"
                        rx="28.5"
                        height="57"
                        width="57"
                        x="19"
                      ></rect>
                      <path
                        fill="black"
                        d="M0 109.5C0 83.2665 21.2665 62 47.5 62V62C73.7335 62 95 83.2665 95 109.5V114H0V109.5Z"
                      ></path>
                    </svg>
                    {alreadyFollow.includes(id) ? "Unfollow" : "Follow"}
                  </span>
                </div>
              </span>
              <span>
                <button id="inbox-btn">
                  <svg
                    viewBox="0 0 512 512"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path>
                  </svg>
                </button>
              </span>
            </div>
          </>
        )}

        {/* Following */}
        <div className="mt-10">
          <span className="text-md font-bold">Following</span>
          <div className={"mt-6"}>
            {follower.map((follower) => {
              return (
                <div className={"mt-4 flex"} key={follower._id}>
                  <span
                    className={"rounded-full"}
                    onClick={() => router.push(`/profile/${follower._id}`)}
                  >
                    <Image
                      src={follower.image}
                      alt={follower.userName}
                      width={0}
                      height={0}
                      className={"cursor-pointer w-8 h-8 mr-5 rounded-full"}
                    />
                  </span>
                  <span
                    className={
                      "text-left text-gray-500 text-sm flex items-center cursor-pointer hover:underline"
                    }
                    onClick={() => router.push(`/profile/${follower._id}`)}
                  >
                    {follower.userName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
