import { GetUserAnswers } from "@/lib/actions/users-action ";
import NoResult from "./NoResult";
import AnswerStatCard from "./cards/AnswesStatCard";
import Pagination from "./Pagination";
interface props {
  userId: string;
  searchParams: any;
}

const AnswersTab = async ({ userId, searchParams }: props) => {
  const { answers, isNext } = await GetUserAnswers({
    userId,
    page: searchParams?.page ? +searchParams.page : 1,
  });

  return (
    // eslint-disable-next-line tailwindcss/classnames-order
    <div className="flex flex-col gap-3 w-full">
      {answers.length > 0 ? (
        answers.map((q) => (
          <AnswerStatCard
            key={q.question.id}
            answerId={q._id}
            id={q.question.id}
            title={q.question.title}
            tags={q.question.tags}
            author={q.question.author}
            votes={q.question.upVotes}
            views={q.question.views}
            answers={q.question.answers}
            createdAt={q.question.createdAt}
            content={q.question.content}
          />
        ))
      ) : (
        <NoResult
          title="There’s no Answer to show"
          imageURL="/assets/images/noResult.png"
          desc="This user no any answer!"
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

export default AnswersTab;
