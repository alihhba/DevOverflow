import React from "react";
import Link from "next/link";

interface TagProps {
  id: string;
  title: string;
  showCount?: boolean;
  total?: number;
}

const Tag = ({ id, title, showCount, total }: TagProps) => {
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
