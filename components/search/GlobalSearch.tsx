import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { SearchParamsProps } from "@/index";
import { cn } from "@/lib/utils";

interface globalSearchProps {
  placeholder: string;
  className?: string;
  iconSide?: "left" | "right";
  mobile?: boolean;
}

const GlobalSearch = ({
  placeholder,
  className,
  iconSide,
  mobile,
}: globalSearchProps) => {
  return (
    <div
      className={cn(
        `w-full flex items-center  bg-light-800 dark:dark-gradient h-[56px] min-h-[56px] rounded-xl`,
        className,
        iconSide === "right" ? "flex-row-reverse" : "flex-row",
        mobile && " max-lg:hidden"
      )}
    >
      <Search
        className={`w-6 h-6  text-dark-500 ${
          iconSide === "right" ? "mr-2" : "ml-2"
        } `}
      />
      <Input
        className="w-full bg-transparent h-full border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:dark:text-light-500 placeholder:text-light-400"
        placeholder={placeholder}
      />
    </div>
  );
};

export default GlobalSearch;
