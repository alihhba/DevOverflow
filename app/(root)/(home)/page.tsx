import Filter from "@/components/Filter";
import NoResult from "@/components/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import GlobalSearch from "@/components/search/GlobalSearch";
import { HomePageFilters } from "@/constant/filters";
import { GetQuestions } from "@/lib/actions/questsion.actions";

const Home = async () => {
  const result = await GetQuestions({});

  return (
    <div className="flex flex-col w-full">
      <p className="text-dark-200  dark:text-light-900 h1-bold md:mb-7 mb-4 ">
        All Questions
      </p>

      <div className="flex items-center max-md:flex-col gap-2">
        <GlobalSearch
          placeholder="Search for Question"
          className="w-full"
          iconSide="left"
        />

        <Filter
          filter={HomePageFilters}
          className="md:min-w-[180px] max-md:w-full "
          mainClassName=" max-md:w-full"
        />
      </div>

      <div className="flex mt-10 w-full flex-col gap-5">
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
