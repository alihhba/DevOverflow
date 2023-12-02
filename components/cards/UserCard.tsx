/* eslint-disable tailwindcss/classnames-order */
import { GetAllUsersTag } from "@/lib/actions/tag-actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tag from "../Tag";

interface userCardProps {
  user: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
    username: string;
  };
}

const UserCard = async ({ user }: userCardProps) => {
  const userTags = await GetAllUsersTag({ userId: user._id });
  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className=" shadow-lg rounded-lg darK:shadow-none"
    >
      <article className="bg-light-900 dark:bg-dark-200 p-7 flex flex-col items-center rounded-lg">
        {user.picture ? (
          <Image
            src={user.picture}
            width={100}
            height={100}
            alt="userImage"
            className="rounded-full mb-4 object-cover min-w-[100px] min-h-[100px] max-w-[100px] max-h-[100px]"
          />
        ) : (
          <Image
            src={"/assets/images/avatar.svg"}
            width={100}
            height={100}
            alt="userImage"
            className="rounded-full mb-4 object-cover min-w-[100px] min-h-[100px] max-w-[100px] max-h-[100px]"
          />
        )}

        <p className="mb-2 text-dark-200 dark:text-light-900 h3-bold line-clamp-1 ">
          {user.name}
        </p>
        <p className="text-dark-500 dark:text-light-500">@{user.username}</p>

        <div className="mt-5 flex gap-3 items-center">
          {userTags.length > 0 ? (
            userTags.map((tag) => (
              <Tag key={tag._id} id={tag._id} title={tag.name} />
            ))
          ) : (
            <p>No Tag Yet</p>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
