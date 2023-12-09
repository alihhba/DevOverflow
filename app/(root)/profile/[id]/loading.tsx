/* eslint-disable tailwindcss/classnames-order */
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="flex w-full  flex-col">
      <div className="flex items-center gap-2 max-md:flex-col max-md:items-center max-md:justify-center mb-6">
        <Skeleton className="rounded-full max-w-[90px] max-h-[90px] min-w-[90px] min-h-[90px] md:max-w-[124px] md:max-h-[124px] md:min-w-[124px] md:min-h-[124px] object-cover md:mr-4"></Skeleton>

        <div className="flex flex-col gap-2"> 
        <Skeleton className="w-24 h-10"/>
        <Skeleton className="w-24 h-5"/>
        </div>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4  gap-2 mb-5">
        <Skeleton className="h-16"/>
        <Skeleton className="h-16"/>
        <Skeleton className="h-16"/>
        <Skeleton className="h-16"/>
      </div>

      <div className="flex items-center w-full gap-3 ">
        <Skeleton className="max-md:w-full md:min-w-[180px] h-12 " />

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
