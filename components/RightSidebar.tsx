import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Tag from "./Tag";
import { GetTopQuestions } from "@/lib/actions/questsion.actions";
import { GetTopTags } from "@/lib/actions/tag-actions";

const RightSidebar = async () => {
  const TopQuestions = await GetTopQuestions();
  const TopTags = await GetTopTags();
  return (
    <div className="sticky inset-y-0 right-0 flex h-screen w-[350px] flex-col overflow-x-hidden overflow-y-scroll border-l bg-light-900  px-6 pb-10 pt-28 dark:border-dark-300 dark:bg-dark-200 max-xl:hidden">
      <div>
        <h3 className="h3-bold mb-7 text-dark-200 dark:text-light-900">
          Top Questions
        </h3>

        <div className="flex w-full flex-col gap-5">
          {TopQuestions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="flex w-full items-center justify-between gap-2"
            >
              <p className={`body-medium line-clamp-2 `}>{question.title}</p>
              <div className="mb-auto h-5 min-h-[20px] w-5 min-w-[20px]">
                <ChevronRight className="h-5 w-5 text-dark-200 dark:text-light-900 " />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="h3-bold mb-7 text-dark-200 dark:text-light-900">
          Popular Tag
        </h3>
        <div className="flex flex-col gap-4 ">
          {TopTags.map((tag) => (
            <Tag
              id={tag._id}
              key={tag._id}
              title={tag.name}
              total={tag?.questionCount}
              showCount
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
