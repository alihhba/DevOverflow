import { GetAllAnswers } from "@/lib/actions/answer-action";
import React from "react";
import AnswerCard from "./cards/AnswerCard";
import { getTimeStamp } from "@/lib/utils";

interface props {
  questionId: string;
  userId: string;
  page?: number;
  filter?: number;
}

const AllAnswers = async ({ questionId, page, filter, userId }: props) => {
  const answersResult = await GetAllAnswers({ questionId });
  return (
    <div>
      {answersResult.length > 0 &&
        answersResult.map((answer) => (
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
    </div>
  );
};

export default AllAnswers;
