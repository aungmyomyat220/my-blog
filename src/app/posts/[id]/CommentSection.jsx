import React, {useEffect, useState} from "react";
import ViewComment from "@/app/posts/[id]/ViewComment";
import {updatePostHook} from "../../../../hooks/updatePostHook";

const CommentSection = (props) => {
  const {mutateAsync,isLoading} = updatePostHook()
  console.log("Loading",isLoading)
  const { post } = props;
  const [commentContent, setCommentContent] = useState("");
  const [user, setUser] = useState({});
  useEffect(() => {
    const userData = sessionStorage["user"];
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleChange = (e) => {
    setCommentContent(e.target.value);
  };

  const commentClear = () => {
    setCommentContent("");
  };

  const sendComment = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-GB");
    const commentUser = {
      cName: user.userName,
      cImage : user.image,
      cContent: commentContent,
      cDate: formattedDate,
    };
    const Id = post._id
    const comments = [...post.comments, commentUser]
    const updateData = {
       comments: comments
    };
    await mutateAsync({ Id, updateData});
    setCommentContent("");
  };

  return (
    <div className="flex justify-end">
      <div className="w-96 border-l border-gray-200 bg-white h-screen backdrop-brightness-200 fixed z-50 shadow-black transition delay-500 p-5">
        <span className={`font-bold text-xl`}>Comments ({post.comments.length})</span>
        <div className={"border border-gray-400 mt-5 h-32 rounded-lg"}>
          <textarea
            maxLength={100}
            name = "comment"
            value={commentContent}
            onChange={handleChange}
            className="hover:border-transparent focus:border-transparent outline-none w-full h-full rounded-lg px-3 py-2 resize-none"
          />
        </div>
        <div className={"flex justify-end mt-3 pb-5 border-b border-gray-400"}>
          <span>
            <button className={"mr-3 px-3 py-1"} onClick={commentClear}>Cancel</button>
          </span>
          <span>
            {isLoading ?
              "Loading" :

            <button id="send-btn" onClick={sendComment}>
              <div className="svg-wrapper-1">
                <div className="svg-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    ></path>
                  </svg>
                </div>
              </div>
              <span>Send</span>
            </button>}
          </span>
        </div>
        <ViewComment updatedPost={post}></ViewComment>
      </div>
    </div>
  );
};

export default CommentSection;
