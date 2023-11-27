import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Tag from "./Tag";

const Topquestions = [
  {
    _id: 1,
    title:
      "Would it be appropriate to point out java an error in another paper during a referee report?Would it be appropriate to point out an error in another paper during a referee report?Would it be appropriate to point out an error in another paper during a referee report?",
  },
  {
    _id: 2,
    title: "How can an airconditioning machine exist?",
  },
  {
    _id: 3,
    title: "Interrogated every time crossing UK Border as citizen",
  },
  {
    _id: 4,
    title: "Low digit addition generator",
  },
  {
    _id: 5,
    title: "What is an example of 3 numbers that do not make up a vector?",
  },
];

const TopTags = [
  { title: "javascript", _id: "1" },
  { title: "react", _id: "2" },
  { title: "node", _id: "3" },
  { title: "tailwindcss", _id: "4" },
  { title: "css", _id: "5" },
  { title: "typescript", _id: "6" },
  { title: "mongodb", _id: "7" },
  { title: "python", _id: "8" },
];

const RightSidebar = () => {
  return (
    <div className="sticky inset-y-0 right-0 flex h-screen w-[350px] flex-col overflow-x-hidden overflow-y-scroll border-l bg-light-900  px-6 pb-10 pt-32 dark:border-dark-300 dark:bg-dark-200 max-xl:hidden">
      <div>
        <h3 className="h3-bold mb-7 text-dark-200 dark:text-light-900">
          Top Questions
        </h3>

        <div className="flex w-full flex-col gap-7">
          {Topquestions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="flex w-full items-center justify-between gap-2"
            >
              <p className={`body-medium line-clamp-3 `}>{question.title}</p>
              <div className="mb-auto h-5 min-h-[20px] w-5 min-w-[20px]">
                <ChevronRight className="h-5 w-5 text-dark-200 dark:text-light-900 " />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold mb-7 text-dark-200 dark:text-light-900">
          Popular Tag
        </h3>
        <div className="flex flex-col gap-4 ">
          {TopTags.map((tag) => (
            <Tag
              id={tag._id}
              key={tag._id}
              title={tag.title}
              // total={tag?.total}
              showCount
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
