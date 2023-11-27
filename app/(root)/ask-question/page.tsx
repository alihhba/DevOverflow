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
    <div className="flex flex-col w-full">
      <p className="h2-bold dark:text-light-900 text-dark-100">
        Ask a question
      </p>

      <AskQuestionForm isEdit={false} mongoUserId={JSON.stringify(user._id)} />
    </div>
  );
};

export default AskQuestionPage;
