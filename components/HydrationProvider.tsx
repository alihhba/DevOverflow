"use client";

import React, { useState, useEffect } from "react";

const   HydrationProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="h2-bold flex h-screen w-full items-center justify-center text-white">
        loading
      </div>
    );

  return <div>{children}</div>;
};

export default HydrationProvider;
