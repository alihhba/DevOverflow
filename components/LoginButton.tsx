import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { SignedOut } from "@clerk/nextjs";

const LoginButton = ({ mobile }: { mobile: boolean }) => {
  return (
    <SignedOut>
      <Link href={"/sign-in"}>
        <Button className="body-medium min-h-[41px] w-full border-none bg-light-800 py-3 text-primary-500 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-dark-400">
          <p className={`${!mobile && "max-lg:hidden"}`}>Login</p>

          <Image
            src={"/assets/icons/contactPlus.svg"}
            width={20}
            height={20}
            alt="contactImage"
            className={`${!mobile && "lg:hidden"} ${
              mobile && "hidden"
            } invert dark:invert-0`}
          />
        </Button>
      </Link>
    </SignedOut>
  );
};

export default LoginButton;
