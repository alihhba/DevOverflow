import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { SignedOut } from "@clerk/nextjs";

const SignupButton = ({ mobile }: { mobile: boolean }) => {
  return (
    <SignedOut>
      <Link href={"/sign-up"}>
        <Button className="body-medium min-h-[41px] w-full  rounded-lg border border-light-700 bg-light-700 py-3 dark:bg-dark-300">
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
