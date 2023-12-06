/* eslint-disable tailwindcss/classnames-order */
"use client";
import {
  DownVoteQuestion,
  UpVoteQuestion,
} from "@/lib/actions/questsion.actions";
import { usePathname, useRouter } from "next/navigation";
import { BiSolidUpArrow, BiUpArrow } from "react-icons/bi";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { DownVoteAnswer, UpVoteAnswer } from "@/lib/actions/answer-action";
import { AddQuestionToCollection } from "@/lib/actions/users-action ";
import { FaRegStar, FaStar } from "react-icons/fa";
import { ViewQuestion } from "@/lib/actions/interaciton-actions";

interface props {
  type: string;
  itemId: string;
  userId: string;
  upVotes: number;
  hasUpVote: boolean;
  downVotes: number;
  hasDownVote: boolean;
  saved?: boolean;
}

const Votes = ({
  type,
  downVotes,
  hasDownVote,
  hasUpVote,
  itemId,
  upVotes,
  saved,
  userId,
}: props) => {
  const pathname = usePathname();
  const [loadingUp, setLoadingUp] = useState(false);
  const [loadingDown, setLoadingDown] = useState(false);
  const [loadingStar, setLoadingStar] = useState(false);
  const router = useRouter();
  const hasRun = useRef(false);

  const handleVote = async (action: string) => {
    try {
      if (!userId) router.push("/sign-in");

      if (type === "question" && userId) {
        if (action === "upVote") {
          setLoadingUp(true);
          await UpVoteQuestion({
            userId,
            questionId: itemId,
            hasDownVoted: hasDownVote,
            hasUpVoted: hasUpVote,
            path: pathname,
          });
        } else if (action === "downVote") {
          setLoadingDown(true);
          await DownVoteQuestion({
            userId,
            questionId: itemId,
            hasDownVoted: hasDownVote,
            hasUpVoted: hasUpVote,
            path: pathname,
          });
        }
      }
      if (type === "answer" && userId) {
        if (action === "upVote") {
          setLoadingUp(true);
          await UpVoteAnswer({
            userId,
            answerId: itemId,
            hasDownVoted: hasDownVote,
            hasUpVoted: hasUpVote,
            path: pathname,
          });
        } else if (action === "downVote") {
          setLoadingDown(true);
          await DownVoteAnswer({
            userId,
            answerId: itemId,
            hasDownVoted: hasDownVote,
            hasUpVoted: hasUpVote,
            path: pathname,
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoadingUp(false);
        setLoadingDown(false);
      }, 1000);
    }
  };

  const collectionHandlelr = async () => {
    try {
      if (!userId) {
        router.push("/sign-in");
      } else {
        setLoadingStar(true);
        await AddQuestionToCollection({
          path: pathname,
          userId,
          questionId: itemId,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoadingStar(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (type === "question" && !hasRun.current) {
      ViewQuestion({
        // eslint-disable-next-line no-unneeded-ternary
        userId: userId ? userId : undefined,
        questionId: itemId,
      });

      hasRun.current = true;
    }
  }, [itemId, userId, type]);

  return (
    <div className="flex items-center gap-2 ">
      <div className="flex items-center gap-2 dark:bg-dark-200 bg-light-800 px-1 md:px-2  md:py-1 rounded-lg">
        {hasUpVote ? (
          loadingUp ? (
            <Loader2
              className="w-3 h-3 animate-spin text-dark-200
        dark:text-light-800 m-2"
            />
          ) : (
            <Button
              onClick={() => handleVote("upVote")}
              className="cursor-pointer p-1 px-2"
              h-10
              w-10
            >
              <BiSolidUpArrow />
            </Button>
          )
        ) : loadingUp ? (
          <Loader2
            className="w-3 h-3 animate-spin text-dark-200
        dark:text-light-800 m-2"
          />
        ) : (
          <Button
            onClick={() => handleVote("upVote")}
            className="cursor-pointer p-1 px-2"
          >
            <BiUpArrow />
          </Button>
        )}

        <div className="">{upVotes - downVotes}</div>
        {hasDownVote ? (
          loadingDown ? (
            <Loader2
              className="w-3 h-3 animate-spin text-dark-200
         dark:text-light-800 m-2"
            />
          ) : (
            <Button
              onClick={() => handleVote("downVote")}
              className="rotate-180 cursor-pointer  p-1 px-2"
            >
              <BiSolidUpArrow />
            </Button>
          )
        ) : loadingDown ? (
          <Loader2
            className="w-3 h-3 animate-spin text-dark-200
        dark:text-light-800 m-2"
          />
        ) : (
          <Button
            onClick={() => handleVote("downVote")}
            className="rotate-180 cursor-pointer p-1 px-2"
          >
            <BiUpArrow />
          </Button>
        )}
      </div>

      {type === "question" && (
        <Button className="p-1 px-2 ml-2" onClick={() => collectionHandlelr()}>
          {loadingStar ? (
            <Loader2
              className="w-3 h-3 animate-spin text-dark-200
        dark:text-light-800"
            />
          ) : saved ? (
            <FaStar />
          ) : (
            <FaRegStar />
          )}
        </Button>
      )}
    </div>
  );
};

export default Votes;
