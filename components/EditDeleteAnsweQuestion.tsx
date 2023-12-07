/* eslint-disable tailwindcss/classnames-order */
"use client";
import { EditIcon, Loader2, Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { DeleteQuestion } from "@/lib/actions/questsion.actions";
import { useState } from "react";
import { DeleteAnswer } from "@/lib/actions/answer-action";
import Link from "next/link";
interface props {
  type: "question" | "answer";
  id: string;
  goPath?: string;
}

const EditDeleteAnsweQuestion = ({ id, type, goPath }: props) => {
  const [questionLoading, setQuestionLoading] = useState(false);
  const [answerLoading, setAnswerLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleDelete = async (type: "answer" | "question") => {
    try {
      if (type === "question") {
        setQuestionLoading(true);
        await DeleteQuestion({ questionId: id, path: pathname });
        goPath && router.push(goPath);
      } else if (type === "answer") {
        setAnswerLoading(true);
        await DeleteAnswer({ answerId: id, path: pathname });
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setTimeout(() => {
        setQuestionLoading(false);
        setAnswerLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="flex items-center max-md:gap-1">
      <Link
        href={
          type === "question" ? `/questions/edit/${id}` : `/answers/edit/${id}`
        }
      >
        <Button disabled={questionLoading || answerLoading} className="p-1">
          <EditIcon className="w-4 h-4 " />
        </Button>
      </Link>
      {questionLoading || answerLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Button
          disabled={questionLoading || answerLoading}
          onClick={() => handleDelete(type)}
          className="p-1"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default EditDeleteAnsweQuestion;
