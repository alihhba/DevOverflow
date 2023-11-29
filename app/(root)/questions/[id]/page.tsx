/* eslint-disable tailwindcss/classnames-order */
import { GetQuestionById } from "@/lib/actions/questsion.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const QuestionsIdPage = async ({ params, searchParams }) => {
  const result = await GetQuestionById({ questionId: params.id });

  const { question } = result;

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="flex items-center gap-3">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center gap-2"
          >
            <Image
              src={question.author.picture}
              width={22}
              height={22}
              alt="userImage"
              className="rounded-full  min-w-[22px] max-w-[22px] max-h-[22px] min-h-[22px] object-cover"
            />
        <p className="">  {question.author.name}</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default QuestionsIdPage;
