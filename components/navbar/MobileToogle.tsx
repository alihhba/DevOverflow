"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { sidebarLinks } from "@/constant/constant";
// import { SignedOut } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { Button } from "../ui/button";
import SignupButton from "../SignupButton";
import LoginButton from "../LoginButton";

const MobileToogle = () => {
  const pathName = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="h-9 w-9 text-dark-200 dark:text-light-900 md:hidden" />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="flex h-screen flex-col items-start overflow-y-scroll border-0 bg-light-900 p-0 pb-10 dark:bg-dark-200"
      >
        <div className="sticky top-0 z-50 h-fit w-full bg-light-900 p-6 dark:bg-dark-200">
          <Link href="/" className="flex items-center gap-1 ">
            <Image
              src={"/assets/images/icon.svg"}
              width={23}
              height={23}
              alt="devLogo"
            />

            <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900">
              Dev<span className="text-primary-500">Overflow</span>
            </p>
          </Link>
        </div>

        <div className="flex w-full flex-col gap-4 px-6">
          {sidebarLinks.map((item): any => {
            const isActive =
              item.route.includes(pathName) && item.route === pathName;

            return (
              <SheetClose asChild key={item.label} className="w-full">
                <Link
                  href={item.route}
                  className={`flex w-full items-center justify-start gap-3 rounded-lg p-2 ${
                    isActive
                      ? "bg-primary-500 text-light-900"
                      : "bg-transparent  text-dark-300 dark:text-light-900"
                  }`}
                >
                  <Image
                    src={item.imgURL}
                    width={20}
                    height={20}
                    alt={item.label}
                    className={`${isActive ? "" : "invert-colors"}`}
                  />
                  <p>{item.label}</p>
                </Link>
              </SheetClose>
            );
          })}
        </div>

        <div className="mt-auto flex w-full flex-col  items-end justify-end gap-3 px-6">
          <SheetClose className="w-full">
            <LoginButton mobile={true} />
          </SheetClose>
          <SheetClose className="w-full">
            <SignupButton mobile={true} />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileToogle;
