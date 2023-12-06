/* eslint-disable tailwindcss/classnames-order */
import { Button } from "@/components/ui/button";
import { GetUserInfo } from "@/lib/actions/users-action ";
import { getFormattedDate } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { CalendarDays, Link2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Stats from "@/components/Stats";
import QuestionsTab from "@/components/QuestionsTab";
import AnswersTab from "@/components/AnswersTab";

const ProfileIdPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: any;
}) => {
  const { userId: clerkId } = auth();
  const { user, answerCount, questionCount } = await GetUserInfo({
    userId: params.id,
  });

  return (
    <div className="flex flex-col w-full ">
      {/* info & edit button */}
      <div className="flex items-center justify-between max-md:flex-col max-md:gap-1">
        {/* info */}
        <div className="flex items-center gap-2 max-md:flex-col max-md:items-center max-md:justify-center">
          <Image
            src={user.picture}
            width={124}
            height={124}
            alt="userProfile"
            className="rounded-full max-w-[90px] max-h-[90px] min-w-[90px] min-h-[90px] md:max-w-[124px] md:max-h-[124px] md:min-w-[124px] md:min-h-[124px] object-cover md:mr-4"
          />

          <div className="flex flex-col">
            <p className="md:h1-bold h2-bold dark:text-light-900 text-dark-200  max-md:text-center">
              {user.name}
            </p>
            <p className="small-regular md:body-regular max-md:text-center">
              @{user.username}
            </p>
            <div className="flex items-center  md:gap-5 md:mt-5 gap-2 mt-2">
              {user.portfolioWeb && (
                <p className="flex small-regular md:body-regular items-center max-md:text-center">
                  <Link2 className="w-4 h-4 mr-0.5" />
                  {user.portfolioWeb}
                </p>
              )}
              {user.location && (
                <p className="flex small-regular md:body-regular items-center max-md:text-center">
                  <MapPin className="w-4 h-4 mr-0.5" />
                  {user.location}
                </p>
              )}
              <p className="flex small-regular md:body-regular items-center max-md:justify-center max-md:mx-auto max-md:text-center">
                <CalendarDays className="w-4 h-4 mr-0.5" />
                Joined {getFormattedDate(user.joinedAt)}
              </p>
            </div>
            {user.bio && (
              <p className="md:text-lg body-regular max-md:justify-center max-md:mx-auto max-md:text-center pt-2">
                {user.bio}
              </p>
            )}
          </div>
        </div>

        {/* edit btn */}
        {clerkId === user.clerkId && (
          <Link href={"/profile/edit"} className="md:mb-auto">
            <Button className="bg-light-800 dark:bg-dark-400 md:mb-auto rounded-lg max-md:mt-1">
              Edit Profile
            </Button>
          </Link>
        )}
      </div>

      {/* stats */}
      <div className="mt-7">
        <Stats answerCount={answerCount} questionCount={questionCount} />
      </div>

      {/* tabs */}
      <div className="mt-7">
        <Tabs defaultValue="top-questions" className="w-full">
          <TabsList className="dark:bg-dark-300 bg-light-800 mb-3">
            <TabsTrigger
              value="top-questions"
              className="min-w-[150px] text-light-500"
            >
              Top Questions
            </TabsTrigger>
            <TabsTrigger
              value="answers"
              className="min-w-[150px] text-light-500"
            >
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-questions" className="w-full">
            <QuestionsTab userId={params.id} searchParams={searchParams} />
          </TabsContent>
          <TabsContent value="answers">
            <AnswersTab userId={params.id} searchParams/>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileIdPage;
