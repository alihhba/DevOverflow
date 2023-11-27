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

        <section className="flex  h-full min-h-screen flex-1 flex-col overflow-y-scroll bg-white px-6 pb-6 pt-32 dark:bg-black max-md:pb-14 sm:px-10">
          <div className="mx-auto w-full md:max-w-5xl">{children}</div>
        </section>

        <RightSidebar />
      </div>

      {/* toaster */}
    </main>
  );
};

export default RootLayout;
