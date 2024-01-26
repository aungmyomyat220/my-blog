import React from 'react';
import CommentUser from '../../../image/user.png'
import Image from "next/image";

const ViewComment = (props) => {
    const { updatedPost } = props
    return (
        <div className='no-scrollbar'>
            {updatedPost.comments.map(comment => {
                return (
                    <div key={comment._id}>
                        <div className={'flex mt-7'}>
                            <span>
                                <Image src={comment.cImage} alt={'profile'} height={0} width={0} className={'w-10 h-10 mt-1 rounded-full'}/>
                            </span>
                            <div className={'flex flex-col text-sm ml-3'}>
                                <span>{comment.cName}</span>
                                <span className='text-gray-400'>{comment.cDate}</span>
                            </div>
                        </div>
                        <div className={'py-7 border-b'}>
                            {comment.cContent}
                        </div>

                    </div>
                )
            })}
        </div>
    );
};

export default ViewComment;