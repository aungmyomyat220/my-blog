import React, {useMemo} from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { formatDate } from "../../../public/js/getDate";
import {getAllPostHook} from "../../../hooks/getAllPostHook";
import Like from '@/image/love.png'
import Image from 'next/image'
import Comment from '@/image/chat.png'
import isAuthenticated from '@/app/auth/authenticate'
import Swal from 'sweetalert2'

const Foryou = ({searchKey}) => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const { data: posts = [], error, isLoading, } = getAllPostHook()

  useEffect(() => {
    const userData = sessionStorage["user"];
    if (userData) {
      setIsAuth(true)
      setUser(JSON.parse(userData));
    }
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => !post.delFlag && post.authorId !== user._id && post.title.toLowerCase().includes(searchKey.toLowerCase()));
  }, [posts, searchKey,user]);

  const now = new Date();
  const postsWithTimeDifferences = filteredPosts.map(post => ({
    ...post,
    timeDifference: now - new Date(post.date)
  }));

  const sortedPosts = postsWithTimeDifferences.sort((a, b) => a.timeDifference - b.timeDifference);

  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-screen justify-center items-center">
        <div className="cube-loader">
          <div className="cube cube1"></div>
          <div className="cube cube2"></div>
          <div className="cube cube3"></div>
          <div className="cube cube4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleClick = async (postId) => {
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
      router.push(`/posts/${postId}`);
    }
  };

  const HighlightedTitle = ({ title, searchKey }) => {
    if (!searchKey) {
      return <span className="font-bold mb-3 text-2xl">{title}</span>;
    }
    const index = title.toLowerCase().indexOf(searchKey.toLowerCase());
    if (index === -1) {
      return <span className="font-bold mb-3 text-2xl">{title}</span>;
    }
    return (
        <span className="font-bold mb-3 text-2xl line-clamp-2">
      {title.substring(0, index)}
          <span className="bg-gradient-to-r from-green-200 to-green-500">{title.substring(index, index + searchKey.length)}</span>
          {title.substring(index + searchKey.length)}
    </span>
    );
  };

  return (
    <div className="no-scrollbar">
      {sortedPosts.map((post) => (
        <div
          className="grid grid-cols-5 border-b border-gray-300 mt-8 cursor-pointer"
          key={post._id}
        >
          <div className="flex flex-col col-span-3">
            <div className="flex">
              <span
                className="hover:underline"
                onClick={() => router.push(`/profile/${post.authorId}`)}
              >
                {post.author}
              </span>
              <span>・</span>
              <span className="mb-3 text-gray-500">
                {formatDate(post.date)}
              </span>
            </div>
            <span
              className={`font-bold mb-3 text-2xl `}
              onClick={() => {
                handleClick(post._id);
              }}
            >
              <HighlightedTitle title={post.title} searchKey={searchKey} />
            </span>
            <span
              className="line-clamp-3 mb-5"
              onClick={() => {
                handleClick(post._id);
              }}
            >
              {post.content}...
            </span>

            <span className={'mb-3 flex items-center'}>
              <Image
                src={Like}
                alt="Like"
                className="w-5 h-5 mr-1"
              />
              <span className={'mr-2'}>{post.like.length}</span>
              <Image src={Comment} alt="Like" className="w-6 h-6 mr-1"
                     height={0}
                     width={0}/>
              <span>{post.comments.length}</span>
            </span>

          </div>
          <div className="mt-10 mr-8 col-span-2">
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="rounded ml-7 w-24 mb-8 h-24 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => {
                  handleClick(post._id);
                }}
              ></img>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Foryou;
