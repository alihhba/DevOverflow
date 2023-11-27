import React from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface TagProps {
  id: string;
  title: string;
  showCount?: boolean;
  total?: number;
  xButton?: boolean;
}

const Tag = ({ id, title, showCount, total, xButton }: TagProps) => {
  if (xButton) {
    return (
      <div className="flex w-fit cursor-pointer items-center justify-between">
        <div className="flex w-fit items-center justify-between gap-2">
          <div className="subtle-regular flex items-center gap-2  rounded-md bg-light-800 py-2 pl-2 pr-1 text-light-400 drop-shadow-lg dark:bg-dark-300 dark:text-light-500 dark:drop-shadow-none">
            <p className="body-medium">{title}</p>

            {xButton && <X className="h-3 w-3" />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <Link
        href={`/tags/${id}`}
        className="flex w-fit items-center justify-between gap-2"
      >
        <div className="subtle-regular  rounded-md bg-light-800 px-4 py-2 text-light-400 drop-shadow-lg dark:bg-dark-300 dark:text-light-500 dark:drop-shadow-none">
          <p className="body-medium">{title}</p>
        </div>
      </Link>
      {showCount && <p className="small-medium">{total}+</p>}
    </div>
  );
};

export default Tag;
