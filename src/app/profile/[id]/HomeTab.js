"use client";
import React, {useEffect, useMemo, useState} from "react";
import {getAllPostHook} from "../../../../hooks/getAllPostHook";
import Image from "next/image";
import { useSelector } from "react-redux";
import Like from "@/image/love.png";
import Comment from "@/image/chat.png";
import { formatDate } from "../../../../public/js/getDate.js";
import {useParams, useRouter} from "next/navigation";


const HomeTab = ({searchKey,searchMode}) => {
  const {id} = useParams()
  const router = useRouter();
  const { loveData } = useSelector((state) => state.post);
  const [user, setUser] = useState({});
  const { data: posts = [] } = getAllPostHook()

  useEffect(() => {
    const userData = sessionStorage["user"];
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [posts]);

  const filterPosts = useMemo(() => {
    return posts.filter((post) => !post.delFlag && post.authorId === id && post.title.toLowerCase().includes(searchKey.toLowerCase()));
  }, [posts, searchKey,user]);

  const now = new Date();
  const postsWithTimeDifferences = filterPosts.map(post => ({
    ...post,
    timeDifference: now - new Date(post.date)
  }));
  const sortedPosts = postsWithTimeDifferences.sort((a, b) => a.timeDifference - b.timeDifference);

  const handleClick = (postId) => {
    router.push(`/posts/${postId}`);
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
        <span className="font-bold mb-3 text-2xl">
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
            className="grid grid-cols-5 px-8 py-10 border-b border-gray-300 mx-5 cursor-pointer"
            key={post._id}
          >
            <div className="flex flex-col mx-5 col-span-4">
              <span className="mb-3 text-gray-500">
                {formatDate(post.date)}
              </span>
              <span
                className="font-bold mb-3 text-lg"
                onClick={() => {
                  handleClick(post._id);
                }}
              >
                <HighlightedTitle title={post.title} searchKey={searchKey} />
              </span>
              <span
                className="line-clamp-3"
                onClick={() => {
                  handleClick(post._id);
                }}
              >
                {post.content}
              </span>

              <div className="flex mr-5 cursor-pointer mt-5">
                {<Image src={Like} alt="Like" className="w-5 h-5 mr-2" />}
                <span>{loveData.loveCount}</span>
                <div className="flex mr-5 cursor-pointer">
                  <Image
                    src={Comment}
                    alt="Like"
                    className="w-5 h-5 mr-2"
                    width={0}
                    height={0}
                  />
                  <span>{post.comments.length}</span>
                </div>
              </div>
            </div>
            <div className="mt-10">
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="rounded ml-7 w-64 h-24 hover:scale-105 transition-transform"
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

export default HomeTab;
