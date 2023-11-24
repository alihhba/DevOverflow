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
      <div className="flex items-center justify-between cursor-pointer w-fit">
        <div className="flex items-center gap-2 justify-between w-fit">
          <div className="dark:bg-dark-300 flex items-center gap-2  bg-light-800 py-2 pl-2 pr-1 rounded-md text-light-400 dark:text-light-500 subtle-regular drop-shadow-lg dark:drop-shadow-none">
            <p className="body-medium">{title}</p>

            {xButton && <X className="w-3 h-3" />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <Link
        href={`/tags/${id}`}
        className="flex items-center gap-2 justify-between w-fit"
      >
        <div className="dark:bg-dark-300  bg-light-800 py-2 px-4 rounded-md text-light-400 dark:text-light-500 subtle-regular drop-shadow-lg dark:drop-shadow-none">
          <p className="body-medium">{title}</p>
        </div>
      </Link>
      {showCount && <p className="small-medium">{total}+</p>}
    </div>
  );
};

export default Tag;
