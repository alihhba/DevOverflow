/* eslint-disable tailwindcss/classnames-order */
import Image from "next/image";
import React from "react";

interface props {
  image: string;
  value: number;
  title: string;
}

const StatsBox = ({ image, title, value }: props) => {
  return (
    <div className="flex items-center  p-3  gap-3 rounded-lg dark:bg-dark-200 bg-light-800 paragraph-semibold">
      <Image src={image} width={30} height={40} alt="goldMeal" />

      <div className="flex flex-col items-start justify-center gap-3">
        <p className="paragraph-semibold">{value}</p>
        <p className="body-medium">{title}</p>
      </div>
    </div>
  );
};

export default StatsBox;
