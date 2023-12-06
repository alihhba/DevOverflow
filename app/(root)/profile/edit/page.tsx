import ProfileForm from "@/components/forms/ProfileForm";
import { getUserById } from "@/lib/actions/users-action ";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const EditProfilePage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-up");
  }

  const user = await getUserById({ userId });

  return (
    <div className="flex w-full flex-col">
      <p className="h2-bold text-dark-100 dark:text-light-900">Edit Profile</p>

      <ProfileForm clerkId={userId} userData={JSON.stringify(user)} />
    </div>
  );
};

export default EditProfilePage;
