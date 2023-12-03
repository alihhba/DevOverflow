/* eslint-disable tailwindcss/classnames-order */
import { GetUserInfo } from "@/lib/actions/users-action ";
import { getFormattedDate } from "@/lib/utils";
import Image from "next/image";

const ProfileIdPage = async ({ params }: { params: { id: string } }) => {
  const { user } = await GetUserInfo({
    userId: params.id,
  });
  
  console.log(user);


  return (
    <div className="flex flex-col w-full">
      {/* info & edit button */}
      <div className="flex items-center justify-between">
        {/* info */}
        <div className="flex items-center gap-2">
          <Image
            src={user.picture}
            width={124}
            height={124}
            alt="userProfile"
            className="rounded-full max-w-[124px] max-h-[124px] min-w-[124px] min-h-[124px] object-cover"
          />

          <div className="flex flex-col">
            <p>{user.name}</p>
            <p>@{user.username}</p>
            {user.location && <p>{user.location}</p>}
            {user.bio && <p>{user.bio}</p>}
            {getFormattedDate(user.joinedAt)}
          </div>
        </div>

        {/* edit btn */}
        <div>edit</div>
      </div>
    </div>
  );
};

export default ProfileIdPage;
