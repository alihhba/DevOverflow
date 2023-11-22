"use client";
import { sidebarLinks } from "@/constant/constant";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";

const LeftSidebar = () => {
  const pathName = usePathname();
  return (
    <div className="flex flex-col pt-32 h-screen sticky top-0 left-0 bottom-0 overflow-y-scroll  bg-light-900 dark:bg-dark-200 w-fit max-md:hidden pb-10 border-r dark:border-dark-300">
      <div className="w-full flex flex-col gap-2 px-6">
        {sidebarLinks.map((item): any => {
          const isActive = pathName.includes(item.route);
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`flex items-center justify-start gap-4 p-4 rounded-lg w-full ${
                isActive
                  ? "bg-primary-500 text-light-900"
                  : "bg-transparent  text-dark-300 dark:text-light-900"
              }`}
            >
              <Image
                src={item.imgURL}
                width={24}
                height={24}
                alt={item.label}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className="base-medium max-lg:hidden">{item.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="flex flex-col  gap-2 mt-auto px-6">
        <LoginButton mobile={false}/>
        <SignupButton mobile={false}/>
      </div>
    </div>
  );
};

export default LeftSidebar;
