/* eslint-disable tailwindcss/classnames-order */
import React from "react";
import Tag from "../Tag";
import Link from "next/link";

interface tagCardParams {
  tag: {
    _id: string;
    name: string;
    questions: [];
  };
}

const TagCard = ({ tag }: tagCardParams) => {
  return (
    <Link
      href={`/tags/${tag._id}`}
      className="p-4 flex flex-col rounded-lg bg-light-900 dark:bg-dark-200 shadow-lg dark:shadow-none"
    >
      <Tag id={tag._id} title={tag.name} />

      <div className="flex items-center gap-2 mt-4">
        <p className="text-primary-500 body-medium">{tag.questions?.length}+</p>
        <p className="text-dark-400 dark:text-light-400 body-medium">
          Questions
        </p>
      </div>
    </Link>
  );
};

export default TagCard;
