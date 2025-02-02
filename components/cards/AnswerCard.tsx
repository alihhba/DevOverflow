/* eslint-disable tailwindcss/classnames-order */

import Image from "next/image";
import React from "react";
import ParseHtml from "../ParseHtml";
import Link from "next/link";
import Votes from "../Votes";
import Line from "../Line";
import { auth } from "@clerk/nextjs";
import User from "@/database/user-schema";
import EditDeleteAnsweQuestion from "../EditDeleteAnsweQuestion";

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

const AnswerCard = async ({
  author,
  content,
  createdAt,
  upVotes,
  downVotes,
  userId,
  id,
}: props) => {
  const { userId: clerkId } = auth();

  const mongoUser = await User.findOne({ clerkId });

  return (
    <div className="flex flex-col w-full mt-7">
      {/* author & votes */}
      <div className="flex md:items-center justify-between">
        <div className="flex md:items-center gap-2 max-md:flex-col">
          <Link
            href={`/profile/${author.clerkId}`}
            className="flex items-center gap-2"
          >
            <Image
              src={author.picture}
              width={24}
              height={24}
              alt=" = await User.Image"
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
          {mongoUser?.id === author?._id.toString() ? (
            <EditDeleteAnsweQuestion type="answer" id={id} />
          ) : (
            <Votes
              type="answer"
              userId={userId?.toString()}
              itemId={id.toString()}
              upVotes={upVotes.length}
              hasUpVote={upVotes.includes(userId)}
              downVotes={downVotes.length}
              hasDownVote={downVotes.includes(userId)}
            />
          )}
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
