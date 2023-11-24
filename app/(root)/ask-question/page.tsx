import AskQuestionForm from "@/components/forms/AskQuestionForm";
import React from "react";

const AskQuestionPage = () => {
  return (
    <div className="flex flex-col w-full">
      <p className="h2-bold dark:text-light-900 text-dark-100">
        Ask a question
      </p>

      <AskQuestionForm isEdit={false} />
    </div>
  );
};

export default AskQuestionPage;
