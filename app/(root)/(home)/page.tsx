import Filter from "@/components/Filter";
import NoResult from "@/components/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import GlobalSearch from "@/components/search/GlobalSearch";
import { HomePageFilters } from "@/constant/filters";
import { GetQuestions } from "@/lib/actions/questsion.actions";

const Home = async ({ searchParams }: any) => {
  const result = await GetQuestions({ searchQuery: searchParams.q });

  return (
    <div className="flex w-full flex-col">
      <p className="h1-bold  mb-4 text-dark-200 dark:text-light-900 md:mb-7 ">
        All Questions
      </p>

      <div className="flex items-center gap-2 max-md:flex-col">
        <GlobalSearch
          placeholder="Search for Question"
          className="w-full"
          iconSide="left"
        />

        <Filter
          filter={HomePageFilters}
          className="max-md:w-full md:min-w-[180px] "
          mainClassName=" max-md:w-full"
        />
      </div>

      <div className="mt-5 flex w-full flex-col gap-3">
        {result.questions.length > 0 ? (
          result.questions.map((q) => (
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
            desc="Be the first to break the silence!"
            btnTitle="Ask a Question"
            btnPath="/ask-question"
            btnClassName="bg-primary-500 "
          />
        )}
      </div>
    </div>
  );
};

export default Home;
