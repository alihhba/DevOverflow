import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { SignedOut } from "@clerk/nextjs";

const SignupButton = ({ mobile }: { mobile: boolean }) => {
  return (
    <SignedOut>
      <Link href={"/sign-up"}>
        <Button className="w-full dark:bg-dark-300 bg-light-700  border-light-700 border rounded-lg py-3 body-medium min-h-[41px]">
          <p className={`${!mobile && "max-lg:hidden"}`}>Sign up</p>

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

export default SignupButton;
