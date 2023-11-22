"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { sidebarLinks } from "@/constant/constant";
import { SignedOut } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const MobileToogle = () => {
  const pathName = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="w-9 h-9 text-dark-200 dark:text-light-900 md:hidden" />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="bg-light-900 dark:bg-dark-200 border-0 flex flex-col h-screen overflow-y-scroll items-start p-0 pb-10"
      >
        <div className="sticky top-0 bg-light-900 dark:bg-dark-200 z-50 w-full h-fit px-6 py-6">
          <Link href="/" className="flex items-center gap-1 ">
            <Image
              src={"/assets/images/icon.svg"}
              width={23}
              height={23}
              alt="devLogo"
            />

            <p className="text-dark-100 font-spaceGrotesk h2-bold dark:text-light-900">
              Dev<span className="text-primary-500">Overflow</span>
            </p>
          </Link>
        </div>

        <div className="w-full flex flex-col gap-4 px-6">
          {sidebarLinks.map((item): any => {
            const isActive = pathName.includes(item.route);
            return (
              <SheetClose asChild key={item.label} className="w-full">
                <Link
                  href={item.route}
                  className={`flex items-center justify-start gap-4 p-4 rounded-lg w-full ${
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

        <div className="flex flex-col w-full gap-3  justify-end items-end mt-auto px-6">
          <SignedOut>
            <SheetClose className="w-full">
              <Link href={"/sign-in"}>
                <Button className="w-full dark:bg-dark-400 bg-light-800 py-3 text-primary-500 body-medium min-h-[41px] outline-none border-none focus-visible:ring-0 focus-visible:ring-offset-0">
                  Login
                </Button>
              </Link>
            </SheetClose>
          </SignedOut>
          <SignedOut>
            <SheetClose className="w-full">
              <Link href={"/sign-up"}>
                <Button className="w-full dark:bg-dark-300 bg-light-700  border-light-700 border rounded-lg py-3 body-medium min-h-[41px]">
                  Sign up
                </Button>
              </Link>
            </SheetClose>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileToogle;
