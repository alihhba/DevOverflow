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
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  votes: Array<Object>;
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
    <div className="flex w-full flex-col gap-3.5 rounded-lg bg-light-900 p-5 drop-shadow-lg dark:bg-dark-200   dark:shadow-none md:px-12 md:py-9">
      <div className="flex w-full flex-col gap-2">
        <p className="small-regular text-dark-400 dark:text-light-400 md:hidden">
          {getTimeStamp(createdAt)}
        </p>
        {/* title */}
        <Link href={`/questions/${id}`}>
          <p className="md:h3-semibold base-medium  line-clamp-2 md:leading-8 lg:line-clamp-3">
            {title}
          </p>
        </Link>
      </div>
      {/* tags */}
      <div className="flex flex-row flex-wrap gap-2 ">
        {tags.map((tag) => (
          <Tag id={tag._id} title={tag.name} key={tag._id} />
        ))}
      </div>
      {/* metrics */}

      <div className="mt-3 flex w-full justify-between max-md:flex-col max-md:gap-2">
        <Metrics
          value={author.name}
          title={getTimeStamp(createdAt)}
          imageUrl={author.picture}
          href={`/profile/${author._id}`}
          isAuthor
          titleClassName="max-md:hidden"
          valueClassName="base-semibold"
        />
        <div className="flex items-center gap-3 md:ml-auto">
          <Metrics
            title="votes"
            imageUrl="/assets/icons/like.svg"
            value={formatNumber(votes?.length)}
            valueClassName="small-regular"
          />
          <Metrics
            title="answers"
            imageUrl="/assets/icons/answers.svg"
            value={formatNumber(answers?.length)}
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
