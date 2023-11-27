import React from "react";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface noResultProps {
  imageURL: string;
  title: string;
  desc: string;
  btnTitle?: string;
  btnPath?: string;
  btnClassName?: string;
}

const NoResult = ({
  desc,
  imageURL,
  title,
  btnClassName,
  btnPath,
  btnTitle,
}: noResultProps) => {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <Image src={imageURL} width={400} height={400} alt="nothing image" />
      <p className="h2-bold">{title}</p>
      <p className="body-regular">{desc}</p>

      {btnPath && (
        <Link href={btnPath} className="mt-3">
          <Button className={cn("text-light-900", btnClassName)}>{btnTitle}</Button>
        </Link>
      )}
    </div>
  );
};

export default NoResult;
