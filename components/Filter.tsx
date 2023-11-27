import { cn } from "@/lib/utils";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface filterProps {
  filter: {
    name: string;
    value: string;
  }[];
  className: string;
  mainClassName: string;
}

const Filter = ({ filter, className, mainClassName }: filterProps) => {
  return (
    <div className={cn("", mainClassName)}>
      <Select>
        <SelectTrigger
          className={`dark:dark-gradient min-h-[56px] gap-3  border-none bg-light-800 ${className}`}
        >
          <SelectValue placeholder="Select filter" />
        </SelectTrigger>
        <SelectContent className="bg-light-800 dark:bg-dark-200">
          <SelectGroup>
            {filter.map((item) => (
              <SelectItem key={item.value} value={item.value} >
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
