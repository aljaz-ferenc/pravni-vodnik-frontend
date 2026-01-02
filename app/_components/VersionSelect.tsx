"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type VersionSelectProps = {
  currentVersion: number;
  versions: number;
  className?: string;
};

export default function VersionSelect({
  currentVersion,
  versions,
  className = "",
}: VersionSelectProps) {
  return (
    <Select value={currentVersion.toString()}>
      <SelectTrigger
        className={cn(
          "px-4 py-1 items-center border-x border-slate-100 dark:border-slate-800 min-w-[110px] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors",
          className,
        )}
      >
        <SelectValue>Verzija {currentVersion}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Array.from({ length: versions }).map((_, index) => (
            <SelectItem
              key={`version-${index + 1}`}
              value={(index + 1).toString()}
            >
              {index + 1}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
