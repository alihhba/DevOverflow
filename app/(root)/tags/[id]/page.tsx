import Filter from "@/components/Filter";
import NoResult from "@/components/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import GlobalSearch from "@/components/search/GlobalSearch";
import { QuestionFilters } from "@/constant/filters";
import { URLProps } from "@/index";
import { GetQuestionByTagId } from "@/lib/actions/tag-actions";
import { auth } from "@clerk/nextjs";

const collectionPage = async ({ params, searchParams }: URLProps) => {
  const { userId: clerkId } = auth();

  if (!clerkId) {
    return null;
  }

  const result = await GetQuestionByTagId({ tagId: params.id });

  return (
    <div className="flex w-full flex-col">
      <p className="h1-bold  mb-4 text-dark-200 dark:text-light-900 md:mb-7 ">
        {result.name}
      </p>

      <div className="flex items-center gap-2 max-md:flex-col">
        <GlobalSearch
          placeholder="Search for Tags"
          className="w-full"
          iconSide="left"
        />

        <Filter
          filter={QuestionFilters}
          className="max-md:w-full md:min-w-[180px] "
          mainClassName=" max-md:w-full"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-5">
        {result.questions.length > 0 ? (
          result.questions.map((q: any) => (
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
            title="There’s no question  to show"
            imageURL="/assets/images/noResult.png"
            desc="Add questions to tags"
          />
        )}
      </div>
    </div>
  );
};

export default collectionPage;
