import AskQuestionForm from "@/components/forms/AskQuestionForm";
import { getUserById } from "@/lib/actions/users-action ";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const AskQuestionPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-up");
  }

  const user = await getUserById({ userId });

  return (
    <div className="flex w-full flex-col">
      <p className="h2-bold text-dark-100 dark:text-light-900">
        Ask a question
      </p>

      <AskQuestionForm isEdit={false} mongoUserId={user?._id} />
    </div>
  );
};

export default AskQuestionPage;
