/* eslint-disable tailwindcss/classnames-order */
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="flex w-full  flex-col">
      <p className="h1-bold flex items-start justify-start w-full mr-auto  mb-4 text-dark-200 dark:text-light-900 md:mb-7 ">
        Ask a question
      </p>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <div className="paragraph-regular pb-3.5  text-dark-100 dark:text-light-800">
            Question Title <span className="text-primary-500">*</span>
          </div>
          <Skeleton className="w-full  h-12 " />
        </div>
        <div className="flex flex-col">
          <div className="paragraph-regular pb-3.5  text-dark-100 dark:text-light-800">
          Detailed explanation of your problem? <span className="text-primary-500">*</span>
          </div>
          <Skeleton className="w-full  h-44 " />
        </div>
        <div className="flex flex-col">
          <div className="paragraph-regular pb-3.5  text-dark-100 dark:text-light-800">
            Tags <span className="text-primary-500">*</span>
          </div>
          <Skeleton className="w-full  h-12 " />
        </div>
      </div>
    </div>
  );
};

export default Loading;
