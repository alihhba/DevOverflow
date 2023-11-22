import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Tag from "./Tag";

const Topquestions = [
  {
    _id: 1,
    title:
      "Would it be appropriate to point out an error in another paper during a referee report?",
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
  { title: "javascript", _id: 1 },
  { title: "react", _id: 2 },
  { title: "node", _id: 3 },
  { title: "tailwindcss", _id: 4 },
  { title: "css", _id: 5 },
  { title: "typescript", _id: 6 },
  { title: "mongodb", _id: 7 },
  { title: "python", _id: 8 },
];

const RightSidebar = () => {
  return (
    <div className="flex overflow-x-hidden flex-col pt-32 px-6 h-screen sticky top-0 right-0 bottom-0 overflow-y-scroll  bg-light-900 dark:bg-dark-200 w-[350px] max-xl:hidden pb-10 border-l dark:border-dark-300">
      <div>
        <h3 className="h3-bold text-dark-200 dark:text-light-900 mb-7">
          Top Questions
        </h3>

        <div className="flex flex-col gap-7 w-full">
          {Topquestions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="flex items-center gap-2 justify-between w-full"
            >
              <p className="body-medium">{question.title}</p>
              <div className="w-5 h-5 min-w-5 min-h-5 mb-auto">
                <ChevronRight className="w-5 h-5 text-dark-200 dark:text-light-900 " />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark-200 dark:text-light-900 mb-7">
          Popular Tag
        </h3>
        <div className="flex flex-col gap-4 ">
          {TopTags.map((tag) => (
            <Tag
              id={tag._id}
              key={tag._id}
              title={tag.title}
              total={tag.total}
              showCount
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
