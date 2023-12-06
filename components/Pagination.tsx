/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import { UrlQuery } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

interface props {
  page: number;
  isNext: boolean;
}

const Pagination = ({ page, isNext }: props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePagination = async (type: string) => {
    const newPage = type === "prev" ? page - 1 : page + 1;

    const newUrl = await UrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: newPage.toString(),
    });

    router.push(newUrl);
  };

  if (!isNext && page === 1) return null;
  return (
    <div className="flex items-center justify-between px-1">
      <Button
        disabled={page === 1}
        onClick={() => handlePagination("prev")}
        variant={"outline"}
      >
        <ChevronLeft />
      </Button>
      <div className="border rounded-md px-4  py-1.5">
        <p>{page}</p>
      </div>
      <Button
        disabled={!isNext}
        onClick={() => handlePagination("next")}
        variant={"outline"}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
