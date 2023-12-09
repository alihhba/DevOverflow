/* eslint-disable tailwindcss/classnames-order */
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="flex w-full  flex-col">
      <p className="h1-bold flex items-start justify-start w-full mr-auto  mb-4 text-dark-200 dark:text-light-900 md:mb-7 ">
      Saved Questions

      </p>

      <div className="flex items-center w-full gap-3 max-md:flex-col">
        <Skeleton className="w-full  h-12 " />

        <Skeleton className="max-md:w-full md:min-w-[180px] h-12 " />
      </div>

      <section className="mt-5 flex w-full flex-wrap gap-4">
        <div className="w-full flex flex-col  gap-4  ">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((x, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Loading;
