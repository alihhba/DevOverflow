/* eslint-disable tailwindcss/classnames-order */
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Navbar from "@/components/navbar/navbar";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen bg-white dark:bg-black">
      <Navbar />
      <div className="flex">
        <LeftSidebar />

        <section className="flex  h-full min-h-screen flex-1 flex-col overflow-y-scroll bg-white px-6 md:pb-20 pt-20 md:pt-28  dark:bg-black max-md:pb-36 sm:px-10">
          <div className="mx-auto w-full md:max-w-7xl">{children}</div>
        </section>

        <div className="">
          <RightSidebar />
        </div>
      </div>

      {/* toaster */}
    </main>
  );
};

export default RootLayout;
