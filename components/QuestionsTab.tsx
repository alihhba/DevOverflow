import { GetUserTopQuestions } from "@/lib/actions/users-action ";
import React from "react";
import QuestionCard from "./cards/QuestionCard";
import NoResult from "./NoResult";
import Pagination from "./Pagination";

interface props {
  userId: string;
  searchParams?: any;
}

const QuestionsTab = async ({ userId, searchParams }: props) => {
  const { questions, isNext } = await GetUserTopQuestions({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });
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

      <div className="mt-10">
        <Pagination
          isNext={isNext}
          page={searchParams?.page ? +searchParams.page : 1}
        />
      </div>
    </div>
  );
};

export default QuestionsTab;
