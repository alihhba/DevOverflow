/* eslint-disable tailwindcss/classnames-order */
import AllAnswers from "@/components/AllAnswers";
import Filter from "@/components/Filter";
import Line from "@/components/Line";
import Metrics from "@/components/Metrics";
import ParseHtml from "@/components/ParseHtml";
import Tag from "@/components/Tag";
import Votes from "@/components/Votes";
import AnswerForm from "@/components/forms/AnswerForm";
import { AnswerFilters } from "@/constant/filters";
import User from "@/database/user-schema";
import { GetQuestionById } from "@/lib/actions/questsion.actions";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const QuestionsIdPage = async ({ params, searchParams }: any) => {
  const { userId: clerkId } = auth();

  let mongoUser = [];

  if (clerkId) {
    mongoUser = await User.find({ clerkId });
  }

  const result = await GetQuestionById({ questionId: params.id });
  const { question } = result;

  return (
    <>
      <div className="flex w-full flex-col">
        {/* name and vote */}
        <div className="flex md:items-center max-md:flex-col-reverse  gap-3">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center gap-2 justify-start"
          >
            <Image
              src={question.author.picture}
              width={22}
              height={22}
              alt="userImage"
              className="rounded-full  min-w-[22px] max-w-[22px] max-h-[22px] min-h-[22px] object-cover"
            />
            <p className="text-dark-100 dark:text-light-850">
              {question.author.name}
            </p>
          </Link>
          <div className="ml-auto">
            <Votes
              type="question"
              userId={mongoUser[0] && mongoUser[0]._id}
              itemId={question._id}
              upVotes={question.upVotes.length}
              hasUpVote={question.upVotes.includes(
                mongoUser[0] && mongoUser[0]._id
              )}
              downVotes={question.downVotes.length}
              hasDownVote={question.downVotes.includes(
                mongoUser[0] && mongoUser[0]._id
              )}
              saved={mongoUser[0]?.saved?.includes(question._id)}
            />
          </div>
        </div>

        {/* title  */}
        <div>
          <p className="mt-3 text-dark-200 dark:text-light-900 h2-semibold">
            {question.title}
          </p>
        </div>

        {/* metrics */}
        <div className="flex lg:items-center max-lg:flex-col mt-5  ">
          <div>
            <Metrics
              imageUrl={"/assets/icons/time.svg"}
              title={getTimeStamp(question.createdAt)}
              value={"Asked"}
              titleClassName="capitalize text-dark-400  dark:text-light-800 "
              valueClassName="small-regular "
            />
          </div>
          <div className="flex items-center lg:ml-6 gap-6 max-lg:mt-3">
            <Metrics
              imageUrl={"/assets/icons/like.svg"}
              value={formatNumber(question.upVotes.length)}
              title={"Votes"}
              titleClassName="capitalize text-dark-400  dark:text-light-800 "
              valueClassName="small-regular "
            />
            <Metrics
              imageUrl={"/assets/icons/answers.svg"}
              value={formatNumber(question.answers.length)}
              title={"Answers"}
              titleClassName="capitalize text-dark-400  dark:text-light-800 "
              valueClassName="small-regular "
            />
            <Metrics
              imageUrl={"/assets/icons/view.svg"}
              value={formatNumber(question.views)}
              title={"Views"}
              titleClassName="capitalize text-dark-400  dark:text-light-800 "
              valueClassName="small-regular "
            />
          </div>
        </div>

        {/* content */}
        <div className="mt-7">
          <ParseHtml data={question.content} />
        </div>

        {/* tags */}
        <div className="flex items-center gap-3 mt-7">
          {question.tags.map((tag: any) => (
            <Tag key={tag._id} title={tag.name} id={tag._id} />
          ))}
        </div>

        <Line />

        {/* answers */}
        <div className="flex flex-col ">
          <div className="flex  md:items-center justify-between max-md:flex-col gap-3">
            <p className="text-primary-500 body-semibold">
              {question.answers.length} Answers
            </p>
            <Filter
              filter={AnswerFilters}
              className="max-md:w-full md:min-w-[180px] "
              mainClassName=" max-md:w-full"
            />
          </div>

          <AllAnswers
            questionId={question._id}
            userId={mongoUser[0] && mongoUser[0]._id!}
          />

          <AnswerForm
            author={JSON.stringify(mongoUser[0] && mongoUser[0]._id)}
            question={JSON.stringify(question._id)}
          />
        </div>
      </div>
    </>
  );
};

export default QuestionsIdPage;
