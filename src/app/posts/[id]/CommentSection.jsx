import React, { useEffect, useState } from "react";
import ViewComment from "@/app/posts/[id]/ViewComment";
import { updatePostHook } from "../../../../hooks/updatePostHook";

const CommentSection = (props) => {
  const { mutateAsync, isLoading } = updatePostHook()
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
      cImage: user.image,
      cContent: commentContent,
      cDate: formattedDate,
    };
    const Id = post._id
    const comments = [...post.comments, commentUser]
    const updateData = {
      comments: comments
    };
    if (commentContent) {
      await mutateAsync({ Id, updateData });
    }
    setCommentContent("");
  };

  return (
    <div className="flex justify-end">
      <div className="w-96 border-l border-gray-200 bg-white h-screen backdrop-brightness-200 fixed z-50 shadow-black transition delay-500 p-5">
        <span className={`font-bold text-xl`}>Comments ({post.comments.length})</span>
        <div className={"border border-gray-400 mt-5 h-32 rounded-lg"}>
          <textarea
            maxLength={100}
            name="comment"
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
              <div role="status" className={'bg-blue-500 px-6 py-1 rounded-lg'}>
                <svg aria-hidden="true"
                  className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div> :
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
