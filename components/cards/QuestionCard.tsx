import React from "react";
import Tag from "../Tag";
import Link from "next/link";
import Metrics from "../Metrics";
import { formatNumber, getTimeStamp } from "@/lib/utils";

interface questionCardProps {
  id: string;
  title: string;
  tags: {
    _id: string;
    title: string;
  }[];
  author: {
    _id: string;
    name: string;
    img: string;
  };
  votes: number;
  views: number;
  answers: Array<Object>;
  createdAt: Date;
}

const QuestionCard = ({
  answers,
  author,
  createdAt,
  id,
  tags,
  title,
  views,
  votes,
}: questionCardProps) => {
  return (
    <div className="w-full flex flex-col bg-light-900 dark:bg-dark-200 md:py-9 py-5 md:px-12 px-5   rounded-lg gap-3.5 drop-shadow-lg dark:shadow-none">
      <div className="flex flex-col gap-2 w-full">
        <p className="dark:text-light-700text-dark-400 small-regular md:hidden">
          {getTimeStamp(createdAt)}
        </p>
        {/* title */}
        <Link href={`/questions/${id}`}>
          <p className="md:h3-semibold base-medium  line-clamp-2 lg:line-clamp-3 md:leading-8">
            {title}
          </p>
        </Link>
      </div>
      {/* tags */}
      <div className="flex flex-row gap-2 flex-wrap ">
        {tags.map((tag) => (
          <Tag id={tag._id} title={tag.title} key={tag._id} />
        ))}
      </div>
      {/* metrics */}

      <div className="flex max-md:flex-col justify-between w-full max-md:gap-2 mt-6">
        <Metrics
          value={author.name}
          title={getTimeStamp(createdAt)}
          imageUrl="/assets/images/avatar.svg"
          href={author._id}
          isAuthor
          titleClassName="max-md:hidden"
          valueClassName="base-semibold"
        />
        <div className="flex items-center md:ml-auto gap-3">
          <Metrics
            title="votes"
            imageUrl="/assets/icons/like.svg"
            value={formatNumber(votes)}
            valueClassName="small-regular"
          />
          <Metrics
            title="answers"
            imageUrl="/assets/icons/answers.svg"
            value={formatNumber(answers.length)}
            valueClassName="small-regular"
          />
          <Metrics
            title="views"
            imageUrl="/assets/icons/view.svg"
            value={formatNumber(views)}
            valueClassName="small-regular"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
