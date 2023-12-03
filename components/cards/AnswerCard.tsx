/* eslint-disable tailwindcss/classnames-order */
import Image from "next/image";
import React from "react";
import ParseHtml from "../ParseHtml";
import Link from "next/link";
import Votes from "../Votes";
import Line from "../Line";

interface props {
  id: string;
  userId: string;
  author: {
    name: string;
    picture: string;
    clerkId: string;
    _id: string;
  };
  content: string;
  createdAt: string;
  upVotes: Array<Object>;
  downVotes: Array<Object>;
}

const AnswerCard = ({
  author,
  content,
  createdAt,
  upVotes,
  downVotes,
  userId,
  id,
}: props) => {
  return (
    <div className="flex flex-col w-full mt-7">
      {/* author & votes */}
      <div className="flex md:items-center justify-between max-md:flex-col">
        <div className="flex md:items-center gap-2 max-md:flex-col">
          <Link
            href={`/profile/${author.clerkId}`}
            className="flex items-center gap-2"
          >
            <Image
              src={author.picture}
              width={24}
              height={24}
              alt="userImage"
              className="rounded-full min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px] object-cover"
            />
            <p className="body-semibold  text-dark-300 dark:text-light-700">
              {author.name}
            </p>
          </Link>
          <p className="dark:text-light-800 text-dark-200 max-md:hidden">|</p>
          <p className="small-regular text-light-400 dark:text-light-500">
            {createdAt}
          </p>
        </div>

        <div className="max-md:ml-auto ">
          <Votes
            type="answer"
            userId={userId}
            itemId={id}
            upVotes={upVotes.length}
            hasUpVote={upVotes.includes(userId)}
            downVotes={downVotes.length}
            hasDownVote={downVotes.includes(userId)}
          />
        </div>
      </div>
      {/* content */}
      <div className="md:mt-6 mt-3">
        <ParseHtml data={content} />
      </div>

      <Line />
    </div>
  );
};

export default AnswerCard;
