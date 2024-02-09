'use client'
import React, { useState, useEffect } from "react";
import {getPost} from "../../../api/api";
import Image from "next/image";
import fire from "../../image/fire.png";
import { useRouter } from "next/navigation";
import {getAllUsersHook} from "../../../hooks/getAllUsersHook"
import {updateUserHook} from '../../../hooks/updateUserHook'
import {getModifiedUsersHook} from "../../../hooks/getModifiedUserHook";
import Swal from 'sweetalert2'
import { fi } from 'date-fns/locale'

const Suggestion = () => {
  const { data: users = [] } = getAllUsersHook()
  const {mutateAsync} = updateUserHook()
  const [topThreePosts, setTopThreePosts] = useState([]);
  const [seeAllUser,setSeeAllUser] = useState(false)
  const [allUser, setAllUser] = useState([]);
  const [follower, setFollower] = useState([]);
  const router = useRouter();
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const userData = sessionStorage["user"];
    if (userData) {
      setIsAuth(true)
      setUser(JSON.parse(userData));
    }
  }, []);

  const Id = user._id
  const { data, isLoading, error } = getModifiedUsersHook(Id);

  useEffect(() => {
    if (!isLoading && !error) {
      const initialFollowers = data.followers;
      setFollower(initialFollowers);
    }
  }, [data]);

  const followerList = users.filter(
      (filterUser) => filterUser._id === user._id
  );
  let filteredUsers = users.filter(
    (filterUser) => filterUser._id !== user._id && !followerList[0]?.followers.includes(filterUser._id)
  );

  useEffect(() => {
    if(filteredUsers.length>3){
      setSeeAllUser(true)
    }
  }, [filteredUsers.length])

  useEffect(() => {
    if(filteredUsers.length > 3){
      const res = filteredUsers.slice(0,3)
      setAllUser(res)
    }
    if(filteredUsers.length <= 3){
      setSeeAllUser(false)
      setAllUser(filteredUsers)
    }
  }, [filteredUsers.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await getPost();
        posts.sort((a, b) => b.like - a.like);
        const topThree = posts.slice(0, 3);
        setTopThreePosts(topThree);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, []);

  const follow =  (followUserId) => {
    const Id = user._id;
    try {
      setFollower((prevFollower) => {
        const updated =  [...prevFollower,followUserId]
        const updateData = {
          followers : updated
        };
        if(isAuth){
          mutateAsync({ Id, updateData });
        }
        return updated
      });
    } catch (error) {
      console.error('Error in follow function:', error);
    }
  };

  const viewPost = async (Id) => {
    if(!isAuth){
      await Swal.fire({
        icon: "warning",
        title: "Attention",
        text: "You need to login first",
        showConfirmButton: true,
        timer: null,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('auth/signIn');
        }
      })}
    else if(isAuth){
      router.push(`/posts/${Id}`);
    }
  }

  return (
    <div>
      <div className="flex items-baseline">
        <span className="text-lg font-medium mr-2">Top Hits</span>
        <Image src={fire} height={20} width={20} alt='fire'></Image>
      </div>
      <div>
        {topThreePosts.map((post) => (
          <div className="flex flex-col my-6" key={post._id}>
            <div className="flex items-center">
              <span key={post._id}>
                <Image
                  src={post.authorImage}
                  alt="Author Image"
                  width={0}
                  height={0}
                  className="rounded-full cursor-pointer mr-3 w-7 h-7"
                />
              </span>
              <span className="text-sm font-medium cursor-pointer">
                {post.author}
              </span>
            </div>
            <span className="text-md font-bold mt-1 cursor-pointer" onClick={()=>viewPost(post._id)}>
              {post.title}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <span className="font-medium text-lg">Who to Follow</span>
        {allUser.map((user) => {
          return (
            <div key={user._id}>
            <div className="h-16 flex mt-3 sm:mb-12 md:mb-4" key={user._id}>
              <span className={'w-2/12'}>
                <Image
                  src={user.image}
                  alt={user.userName}
                  className="rounded-full w-9 h-9 cursor-pointer"
                  onClick={()=> router.push(`/profile/${user._id}`)}
                  height={0}
                  width={0}
                ></Image>
              </span>
              <div className="px-3 flex flex-col w-6/12">
                <span className="font-bold hover:underline cursor-pointer" onClick={()=> router.push(`/profile/${user._id}`)}>{user.userName}</span>
                {
                  user.userBio.mainLanguage ?
                      <span className="text-left text-sm text-gray-500 line-clamp-2">
                        {user.userBio.mainLanguage} {user.userBio.experience} year{user.userBio.experience > 1 ? "s" : ""} Developer at {user.userBio.companyName}
                      </span>
                      :
                      <span className="text-left text-sm text-gray-500 line-clamp-2">
                        Details doesn't update yet
                      </span>
                }

              </div>
              <span className={'w-4/12'}>
                <button className="border border-black rounded-full px-3 py-1 hover:bg-black hover:text-white"
                        onClick={() => {
                          follow(user._id)
                        }}>
                  Follow
                </button>
              </span>
            </div>
            </div>
          );
        })
        }
        {/*{seeAllUser &&*/}
        {/*  <span className={'hover:underline text-blue-500 cursor-pointer'} onClick={seeMore}>see more</span>*/}
        {/*}*/}
      </div>
    </div>
  );
};

export default Suggestion;
