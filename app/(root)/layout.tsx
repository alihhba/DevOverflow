import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Navbar from "@/components/navbar/navbar";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-white dark:bg-black h-screen">
      <Navbar />
      <div className="flex">
        <LeftSidebar />

        <section className="flex  bg-white dark:bg-black min-h-screen h-full overflow-y-scroll flex-1 flex-col px-6 pb-6 pt-32 max-md:pb-14 sm:px-10">
          <div className="mx-auto w-full md:max-w-5xl">{children}</div>
        </section>

        <RightSidebar />
      </div>

      {/* toaster */}
    </main>
  );
};

export default RootLayout;
