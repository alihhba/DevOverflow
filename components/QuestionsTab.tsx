import { GetUserTopQuestions } from "@/lib/actions/users-action ";
import React from "react";
import QuestionCard from "./cards/QuestionCard";
import NoResult from "./NoResult";

interface props {
  userId: string;
}

const QuestionsTab = async ({ userId }: props) => {
  const { questions } = await GetUserTopQuestions({ userId });
  return (
    // eslint-disable-next-line tailwindcss/classnames-order
    <div className="flex flex-col gap-3 w-full">
      {questions.length > 0 ? (
        questions.map((q) => (
          <QuestionCard
            key={q._id}
            id={q._id}
            title={q.title}
            tags={q.tags}
            author={q.author}
            votes={q.upVotes}
            views={q.views}
            answers={q.answers}
            createdAt={q.createdAt}
            content={q.content}
          />
        ))
      ) : (
        <NoResult
          title="There’s no question to show"
          imageURL="/assets/images/noResult.png"
          desc="This user no any question!"
        />
      )}
    </div>
  );
};

export default QuestionsTab;
