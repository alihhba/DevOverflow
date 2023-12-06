import { GetAllAnswers } from "@/lib/actions/answer-action";
import React from "react";
import AnswerCard from "./cards/AnswerCard";
import { getTimeStamp } from "@/lib/utils";
import Pagination from "./Pagination";

interface props {
  questionId: string;
  userId: string;
  page?: number;
  filter?: number;
  searchParams?: any;
}

const AllAnswers = async ({
  questionId,
  page,
  filter,
  userId,
  searchParams,
}: props) => {
  const { answers,totalAnswers, isNext } = await GetAllAnswers({
    questionId,
    page: searchParams?.page ? +searchParams.page : 1,
  });
  return (
    <div>
      {totalAnswers.length > 0 &&
        answers.map((answer) => (
          <AnswerCard
            key={answer._id}
            userId={userId}
            id={answer._id}
            author={answer.author}
            content={answer.content}
            createdAt={getTimeStamp(answer.createdAt)}
            upVotes={answer.upVotes}
            downVotes={answer.downVotes}
          />
        ))}

      <div className="mt-10">
        <Pagination
          isNext={isNext}
          page={searchParams?.page ? +searchParams.page : 1}
        />
      </div>
    </div>
  );
};

export default AllAnswers;
