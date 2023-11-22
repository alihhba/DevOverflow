import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";

const GlobalSearch = () => {
  return <div className="w-full flex items-center max-w-[600px] max-lg:hidden bg-light-800 dark:dark-gradient h-[56px] min-h-[56px] rounded-xl">
    <Search className="w-6 h-6 ml-2 text-dark-500"/>
    <Input className="w-full bg-transparent h-full border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:dark:text-light-500 placeholder:text-light-400" placeholder="Search globally"/>
  </div>;
};

export default GlobalSearch;
