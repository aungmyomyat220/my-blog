import { useParams } from "next/navigation";
import { getModifiedUsersHook } from "../../../../hooks/getModifiedUser";
import Work from "../../../image/suitcase.png";
import Experience from "../../../image/quality.png";
import Programming from "../../../image/coding.png";
import Facebook from "../../../image/facebook.png";
import Linkedin from "../../../image/linkedin-logo.png";
import Github from "../../../image/github.png";
import Image from "next/image";
import { useEffect, useState } from "react";

const AboutTab = () => {
  const { id } = useParams();
  const [viewerMode, setViewerMode] = useState(false);
  const [showUserData, setShowUserData] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const userData = sessionStorage["user"];
    if (userData) {
      setUser(JSON.parse(userData));
    }
    if (user && user._id !== id) {
      setViewerMode(true);
    } else if (user && user._id === id) {
      setViewerMode(false);
      setShowUserData(true);
    }
  }, [viewerMode]);

  const { data: viewerUser, isLoading, error } = getModifiedUsersHook(id);
  useEffect(() => {
    if (!isLoading) {
      if (viewerUser.userBio.experience) {
        setShowUserData(true);
      }
    }
  }, [viewerUser]);

  return (
    <>
      <div className="px-8 py-8 mx-5">
        {viewerMode ? (
          showUserData ? (
            <div className="bg-gray-200 h-80 flex flex-col p-5 mt-14">
              <span className={"ml-2 font-medium text-lg mb-2"}>About</span>
              <div className={"flex items-center"}>
                <span>
                  <Image
                    src={Work}
                    alt={"Work Place"}
                    height={5}
                    width={17}
                  ></Image>
                </span>
                <span className={"ml-2"}>
                  Work at {viewerUser.userBio.companyName}
                </span>
              </div>

              <div className={"flex items-center mt-3"}>
                <span>
                  <Image
                    src={Programming}
                    alt={"Language"}
                    height={5}
                    width={20}
                  ></Image>
                </span>
                <span className={"ml-2"}>
                  Expertise in {viewerUser.userBio.mainLanguage}
                </span>
              </div>

              <div className={"flex items-center mt-3"}>
                <span>
                  <Image
                    src={Experience}
                    alt={"Language"}
                    height={5}
                    width={20}
                  ></Image>
                </span>
                <span className={"ml-2"}>
                  {viewerUser.userBio.experience} year
                  {viewerUser.userBio.experience > 1 ? "s" : ""} Experience in
                  Programming
                </span>
              </div>

              <div className={"flex flex-col mt-5"}>
                <span className={"ml-2 font-medium text-lg "}>
                  Social Media
                </span>
                <div className={"flex mt-2"}>
                  <span className={"mr-3 cursor-pointer"}>
                    <Image
                      src={Facebook}
                      alt={"facebook"}
                      height={20}
                      width={25}
                    ></Image>
                  </span>
                  <span className={"mr-3 cursor-pointer"}>
                    <Image
                      src={Linkedin}
                      alt={"linkin"}
                      height={20}
                      width={25}
                    ></Image>
                  </span>
                  <span className={"mr-3 cursor-pointer"}>
                    <Image
                      src={Github}
                      alt={"github"}
                      height={20}
                      width={25}
                    ></Image>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-200 h-80 flex flex-col justify-center items-center px-20 mt-14">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <span className="font-bold text-xl">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                User doesn't update Bio yet
              </span>
            </div>
          )
        ) : (
          <>
            {showUserData ? (
              <div className="bg-gray-200 h-80 flex flex-col p-5 mt-14">
                <span className={"ml-2 font-medium text-lg mb-2"}>About</span>
                <div className={"flex items-center"}>
                  <span>
                    <Image
                      src={Work}
                      alt={"Work Place"}
                      height={5}
                      width={17}
                    ></Image>
                  </span>
                  <span className={"ml-2"}>
                    Work at {user.userBio.companyName}
                  </span>
                </div>

                <div className={"flex items-center mt-3"}>
                  <span>
                    <Image
                      src={Programming}
                      alt={"Language"}
                      height={5}
                      width={20}
                    ></Image>
                  </span>
                  <span className={"ml-2"}>
                    Expertise in {user.userBio.mainLanguage}
                  </span>
                </div>

                <div className={"flex items-center mt-3"}>
                  <span>
                    <Image
                      src={Experience}
                      alt={"Language"}
                      height={5}
                      width={20}
                    ></Image>
                  </span>
                  <span className={"ml-2"}>
                    {viewerUser.userBio.experience} year
                    {user.userBio.experience > 1 ? "s" : ""} Experience in
                    Programming
                  </span>
                </div>

                <div className={"flex flex-col mt-5"}>
                  <span className={"ml-2 font-medium text-lg "}>
                    Social Media
                  </span>
                  <div className={"flex mt-2"}>
                    <span className={"mr-3 cursor-pointer"}>
                      <Image
                        src={Facebook}
                        alt={"facebook"}
                        height={20}
                        width={25}
                      ></Image>
                    </span>
                    <span className={"mr-3 cursor-pointer"}>
                      <Image
                        src={Linkedin}
                        alt={"linkin"}
                        height={20}
                        width={25}
                      ></Image>
                    </span>
                    <span className={"mr-3 cursor-pointer"}>
                      <Image
                        src={Github}
                        alt={"github"}
                        height={20}
                        width={25}
                      ></Image>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-200 h-80 flex flex-col justify-center items-center px-20 mt-14">
                <span className="font-bold text-xl">
                  Tell the world about yourself
                </span>
                <span className="px-28 text-center my-5">
                  Here’s where you can share more about yourself: your history,
                  work experience, accomplishments, interests, dreams, and more.
                  You can even add images and use rich text to personalize your
                  bio.
                </span>
                <button className="border border-black px-4 py-1 rounded-full hover:bg-black hover:text-white">
                  Get Started
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AboutTab;
