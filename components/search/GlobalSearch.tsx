"use client";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
// import { SearchParamsProps } from "@/index";
import { UrlQuery, cn, deleteEmptyQueryUrl } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    if (search) {
      const delay = setTimeout(async () => {
        const newUrl = await UrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      }, 300);

      return () => clearTimeout(delay);
    } else {
      setTimeout(async () => {
        const newUrl = await deleteEmptyQueryUrl({
          keys: ["q"],
          params: searchParams.toString(),
        });

        router.push(newUrl, { scroll: false });
      }, 0);
    }
  }, [search, query, pathname, router, searchParams]);

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
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default GlobalSearch;
