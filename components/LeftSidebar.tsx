/* eslint-disable tailwindcss/classnames-order */
"use client";
import { sidebarLinks } from "@/constant/constant";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";

const LeftSidebar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  return (
    <div className="sticky inset-y-0 left-0 flex h-screen w-fit flex-col overflow-y-scroll border-r  bg-light-900 pb-10 pt-20 md:pt-28 dark:border-dark-300 dark:bg-dark-200 max-md:hidden">
      <div className="flex w-full flex-col gap-2 px-2 lg:px-6">
        {sidebarLinks.map((item): any => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          if (item.route === "/profile") {
            if (userId) {
              item.route = `${item.route}/${userId}`;
            } else {
              return null;
            }
          }
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`flex w-full items-center justify-start gap-4 rounded-lg p-2  ${
                isActive
                  ? "bg-primary-500/70 text-light-900"
                  : "bg-transparent  text-dark-300 dark:text-light-900"
              }`}
            >
              <Image
                src={item.imgURL}
                width={19}
                height={19}
                alt={item.label}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className=" max-lg:hidden text-sm">{item.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto flex  flex-col gap-2 px-6">
        <LoginButton mobile={false} />
        <SignupButton mobile={false} />
      </div>
    </div>
  );
};

export default LeftSidebar;
