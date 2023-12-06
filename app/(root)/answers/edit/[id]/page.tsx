import AnswerForm from "@/components/forms/AnswerForm";
import { GetAnswerById } from "@/lib/actions/answer-action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface props {
  params: {
    id: string;
  };
}

const EditAnswerPage = async ({ params }: props) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-up");
  }

  // const user = await getUserById({ userId });
  const answer = await GetAnswerById({ id: params.id });

  return (
    <div className="flex w-full flex-col">
      <p className="h2-bold text-dark-100 dark:text-light-900">Edit Answer</p>

      <AnswerForm edit answer={JSON.stringify(answer)} author={userId} />
    </div>
  );
};

export default EditAnswerPage;
