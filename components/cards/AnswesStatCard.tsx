/* eslint-disable tailwindcss/classnames-order */
import { getUserById } from "@/lib/actions/users-action ";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import Metrics from "../Metrics";
import Tag from "../Tag";

interface props {
  id: string;
  answerId: string;
  title: string;
  content: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  votes: Array<Object>;
  views: number;
  answers: Array<Object>;
  createdAt?: Date;
}

const AnswerStatCard = async ({
  answers,
  author,
  createdAt,
  id,
  answerId,
  tags,
  title,
  views,
  votes,
  content,
}: props) => {
  const { userId } = auth();

  const user = await getUserById({ userId });

  return (
    <div className="relative flex w-full flex-col gap-2  p-3 drop-shadow-lg  border-b dark:border-dark-300 dark:shadow-none md:px-5 md:py-4">
      {user?.saved.includes(id) && (
        <div className="absolute top-3 right-3">
          <FaStar />
        </div>
      )}

      <div className="flex w-full flex-col gap-2">
        <p className="small-regular text-dark-400 dark:text-light-400 md:hidden">
          {getTimeStamp(createdAt!)}
        </p>
        {/* title */}
        <Link href={`/questions/${id}/#${answerId}`}>
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

      <div className="mt-1 flex w-full justify-between max-md:flex-col max-md:gap-2">
        <Metrics
          value={author.name}
          title={getTimeStamp(createdAt!)}
          imageUrl={author.picture}
          href={`/profile/${author.clerkId}`}
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

export default AnswerStatCard;
