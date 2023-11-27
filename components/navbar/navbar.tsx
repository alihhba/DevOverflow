import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ThemeToggleButton } from "../ThemeToggleButton";
import MobileToogle from "./MobileToogle";
import GlobalSearch from "../search/GlobalSearch";

const Navbar = () => {
  return (
    <nav className="flex-between  fixed top-0 z-50 w-full border-b bg-light-900 p-4 dark:border-dark-300 dark:bg-dark-200 sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src={"/assets/images/icon.svg"}
          width={23}
          height={23}
          alt="devLogo"
        />

        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev<span className="text-primary-500">Overflow</span>
        </p>
      </Link>

      <GlobalSearch
        placeholder="Search Globally"
        className="max-w-[600px]"
        iconSide="left"
        mobile
      />

      <div className="flex-between gap-5">
        <ThemeToggleButton />

        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: { avatarBox: "h-10 w-10" },
              variables: { colorPrimary: "#fff" },
            }}
          />
        </SignedIn>

        <MobileToogle />
      </div>
    </nav>
  );
};

export default Navbar;
