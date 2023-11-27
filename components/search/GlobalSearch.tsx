import { Search } from "lucide-react";
import { Input } from "../ui/input";
// import { SearchParamsProps } from "@/index";
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
        className={`h-6 w-6  text-dark-500 ${
          iconSide === "right" ? "mr-2" : "ml-2"
        } `}
      />
      <Input
        className="h-full w-full border-none bg-transparent outline-none placeholder:text-light-400 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:dark:text-light-500"
        placeholder={placeholder}
      />
    </div>
  );
};

export default GlobalSearch;
