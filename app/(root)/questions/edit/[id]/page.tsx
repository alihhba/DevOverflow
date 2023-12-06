import AskQuestionForm from "@/components/forms/AskQuestionForm";
import { GetQuestionById } from "@/lib/actions/questsion.actions";
import { getUserById } from "@/lib/actions/users-action ";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

interface props {
  params: {
    id: string;
  };
}

const EditQuestionPage = async ({ params }: props) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-up");
  }

  const user = await getUserById({ userId });
  const questionInfo = await GetQuestionById({ questionId: params.id });

  return (
    <div className="flex w-full flex-col">
      <p className="h2-bold text-dark-100 dark:text-light-900">Edit question</p>

      <AskQuestionForm
        isEdit={true}
        mongoUserId={user?._id}
        questionInfo={JSON.stringify(questionInfo)}
      />
    </div>
  );
};

export default EditQuestionPage;
