/* eslint-disable tailwindcss/no-custom-classname */
"use client";
/* eslint-disable tailwindcss/classnames-order */
import { UrlQuery, cn } from "@/lib/utils";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface filterProps {
  filter: {
    name: string;
    value: string;
  }[];
  className: string;
  mainClassName: string;
}

const Filter = ({ filter, className, mainClassName }: filterProps) => {
  const [filterItem, setFilterItem] = useState("select filter");
  const [showFilter, setShowFilter] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = async (item: string) => {
    const newUrl = await UrlQuery({
      params: pathname.toString(),
      key: "filter",
      value: item,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className={cn("relative max-md:w-full", mainClassName)}>
      {/* <Select>
        <SelectTrigger
          className={`dark:dark-gradient min-h-[56px] gap-3  border-none bg-light-800 ${className}`}
        >
          <SelectValue placeholder="Select filter" />
        </SelectTrigger>
        <SelectContent className="bg-light-800 dark:bg-dark-200 z-50">
          <SelectGroup>
            {filter.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                onClick={() => handleClick(item.value)}
              >
                <p>{item.name}</p>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select> */}

      <div
        className="cursor-pointer dark:bg-dark-200 bg-light-800 h-[54px] min-h-[54px] items-center  flex rounded-lg px-4 w-[170px] max-md:w-full md:min-w-full min-w-[170px] justify-start "
        onClick={() => setShowFilter(!showFilter)}
      >
        {filterItem}
      </div>

      {showFilter && (
        <div
          className={`absolute  top-14 z-50 bg-light-850 dark:bg-dark-200 rounded-lg px-3 py-2 md:max-w-[170px] md:w-[170px] max-md:w-full`}
        >
          {filter.map((item) => (
            <div
              className={`text-sm flex items-center cursor-pointer px-2 py-1 rounded-sm mb-2 w-full`}
              key={item.value}
              onClick={() => {
                setFilterItem(item.name);
                setShowFilter(false);
                handleClick(item.value);
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
