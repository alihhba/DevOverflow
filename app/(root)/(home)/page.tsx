import Filter from "@/components/Filter";
import NoResult from "@/components/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import GlobalSearch from "@/components/search/GlobalSearch";
import { HomePageFilters } from "@/constant/filters";

const questions = [
  {
    _id: "1",
    title: "crud operation on mongodb",
    tags: [
      { _id: "1", title: "mongodb" },
      { _id: "2", title: "nextjs" },
    ],
    author: {
      _id: "1",
      name: "ali",
      img: "image-url-ali",
    },
    votes: 10,
    views: 56,
    answers: [],
    createdAt: new Date("2023-11-19T13:00:00.000Z"),
  },
  {
    _id: "2",
    title: "how can center div",
    tags: [
      { _id: "1", title: "css" },
      { _id: "2", title: "nextjs" },
    ],
    author: {
      _id: "2",
      name: "mmd",
      img: "image-url-mmd",
    },
    votes: 3432,
    views: 121111311,
    answers: [],
    createdAt: new Date("2022-09-01T12:00:00.000Z"),
  },
];


const Home = () => {
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
        {questions.length > 0 ? (
          questions.map((q) => (
            <QuestionCard
              key={q._id}
              id={q._id}
              title={q.title}
              tags={q.tags}
              author={q.author}
              votes={q.votes}
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
