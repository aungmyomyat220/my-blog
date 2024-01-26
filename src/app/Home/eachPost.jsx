import React, { useEffect } from "react";
import Image from "next/image";
import Eye from "@/image/view.png";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { viewCount } from "../../../Global Redux/createSlice/viewSlice";

const EachPost = () => {
  const dispatch = useDispatch();
  const { viewCounts } = useSelector((state) => state.view);
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/posts");
  }, [router]);

  const {
    data: posts,
    error,
    isLoading,
  } = useQuery({ queryKey: ["get"], queryFn: getPost });

  const viewIncrease = (postId) => {
    dispatch(viewCount(postId));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-screen justify-center items-center">
        <span className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="textColor">
      <div className="md:grid md:grid-cols-2 mb-10">
        {posts.map((post, index) => (
          <div key={index} className="mt-8 md:mr-4 mb-5">
            {post.image ? (
              <img
                src={post.image}
                alt=""
                className="h-52 mb-2 px-3 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => {
                  viewIncrease(post._id);
                  router.push(`/posts/${post._id}`);
                }}
              />
            ) : (
              ""
            )}
            <div className="px-4 flex flex-col sm:mt-3">
              <span
                className="text-2xl font-semibold mb-3 hover:underline"
                onClick={() => {
                  viewIncrease(post._id);
                  router.push(`/posts/${post._id}`);
                }}
              >
                {post.title}
              </span>
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </span>
            </div>
            <div className="px-4 mt-5 flex flex-col">
              <span>
                {post.content.split(" ").length > 100
                  ? post.content.split(" ").slice(0, 59).join(" ") + "......"
                  : post.content}
              </span>
              <div className="mt-3 flex justify-between">
                <div className="flex">
                  <Image
                    src={post.authorImage}
                    alt=""
                    className="w-11 h-11 rounded-full"
                    width={0}
                    height={0}
                  ></Image>
                  <span className="font-bold text-lg ml-2 mt-2">
                    {post.author}
                  </span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Image src={Eye} alt="View" className="w-5 h-5 mr-2" />
                  <span>
                    {viewCounts[post._id] || 0} View
                    {viewCounts[post._id] > 1 && "s"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EachPost;
