import Navbar from "@/components/navbar/navbar";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-white dark:bg-black">
      <Navbar />
      <div className="flex">
        <div className="max-md:hidden">leftsidevar</div>

        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full md:max-w-5xl">{children}</div>
        </section>

        <div className="max-md:hidden">rightsidebar</div>
      </div>
      toaster
    </main>
  );
};

export default RootLayout;
