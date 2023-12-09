/* eslint-disable tailwindcss/classnames-order */
import Line from "@/components/Line";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="flex w-full  flex-col">
      <div className="flex items-center max-md:flex-col max-md:items-center max-md:justify-center mb-6">
        <Skeleton className="rounded-full max-w-[24px] max-h-[24px] min-w-[24px] min-h-[24px] md:max-w-[32px] md:max-h-[32px] md:min-w-[32px] md:min-h-[32px] object-cover md:mr-2"></Skeleton>

        <div className="flex flex-col gap-2">
          <Skeleton className="w-24 h-3" />
        </div>
      </div>

      <div className="flex flex-col gap-1 mb-3 ">
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
      </div>

      <div className="flex gap-5 mb-3 ">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-6 w-36" />
      </div>

      <div className="flex flex-col gap-1 mb-3 ">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>

      <Line />

      <div className="flex justify-between items-center">
        <p className="text-primary-500">Answers</p>
        <Skeleton className="h-12 w-36" />
      </div>

      <section className="mt-5 flex w-full flex-wrap gap-4">
        <div className="w-full flex flex-col  gap-4  ">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((x, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex   items-center  mb-6">
                <Skeleton className="rounded-full max-w-[24px] max-h-[24px] min-w-[24px] min-h-[24px] md:max-w-[32px] md:max-h-[32px] md:min-w-[32px] md:min-h-[32px] object-cover md:mr-2"></Skeleton>

                <div className="flex flex-col gap-2">
                  <Skeleton className="w-24 h-3" />
                </div>
              </div>
              <div className="flex flex-col gap-1 mb-3 ">
                <Skeleton className="h-6" />
                <Skeleton className="h-6" />
              </div>

              <Line />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Loading;
