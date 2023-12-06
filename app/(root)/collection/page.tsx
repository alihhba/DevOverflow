import Filter from "@/components/Filter";
import NoResult from "@/components/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import GlobalSearch from "@/components/search/GlobalSearch";
import { HomePageFilters } from "@/constant/filters";
import { GetSavedQuestion } from "@/lib/actions/users-action ";
import { auth } from "@clerk/nextjs";

const collectionPage = async ({ searchParams }: any) => {
  const { userId: clerkId } = auth();

  if (!clerkId) {
    return null;
  }

  const result = await GetSavedQuestion({
    clerkId,
    searchQuery: searchParams.q,
  });

  return (
    <div className="flex w-full flex-col">
      <p className="h1-bold  mb-4 text-dark-200 dark:text-light-900 md:mb-7 ">
        Saved Questions
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

      <div className="mt-5 flex w-full flex-col gap-5">
        {result.questions.saved.length > 0 ? (
          result.questions.saved.map((q: any) => (
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
            title="There’s no question saved to show"
            imageURL="/assets/images/noResult.png"
            desc="Add questions to collection"
          />
        )}
      </div>
    </div>
  );
};

export default collectionPage;
