/* eslint-disable tailwindcss/classnames-order */
"use client";
import {
  DownVoteQuestion,
  UpVoteQuestion,
} from "@/lib/actions/questsion.actions";
import { usePathname } from "next/navigation";
import { BiSolidUpArrow, BiUpArrow } from "react-icons/bi";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { DownVoteAnswer, UpVoteAnswer } from "@/lib/actions/answer-action";
import { AddQuestionToCollection } from "@/lib/actions/users-action ";

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

  const handleVote = async (action: string) => {
    try {
      if (!userId) return;

      if (type === "question") {
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
      if (type === "answer") {
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
      await AddQuestionToCollection({
        path: pathname,
        userId,
        questionId: itemId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center gap-2">
      {hasUpVote ? (
        loadingUp ? (
          <Loader2
            className="w-3 h-3 animate-spin text-dark-200
        dark:text-light-800"
          />
        ) : (
          <Button
            onClick={() => handleVote("upVote")}
            className="cursor-pointer p-1"
          >
            <BiSolidUpArrow />
          </Button>
        )
      ) : loadingUp ? (
        <Loader2
          className="w-3 h-3 animate-spin text-dark-200
        dark:text-light-800"
        />
      ) : (
        <Button
          onClick={() => handleVote("upVote")}
          className="cursor-pointer p-1"
        >
          <BiUpArrow />
        </Button>
      )}

      <div className="">{upVotes - downVotes}</div>
      {hasDownVote ? (
        loadingDown ? (
          <Loader2
            className="w-3 h-3 animate-spin text-dark-200
         dark:text-light-800"
          />
        ) : (
          <Button
            onClick={() => handleVote("downVote")}
            className="rotate-180 cursor-pointer  p-1"
          >
            <BiSolidUpArrow />
          </Button>
        )
      ) : loadingDown ? (
        <Loader2
          className="w-3 h-3 animate-spin text-dark-200
        dark:text-light-800"
        />
      ) : (
        <Button
          onClick={() => handleVote("downVote")}
          className="rotate-180 cursor-pointer p-1"
        >
          <BiUpArrow />
        </Button>
      )}

      {type === "question" && (
        <Button  onClick={() => collectionHandlelr()}>star</Button>
      )}
    </div>
  );
};

export default Votes;
