/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { formatDate } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Modifiers, DayPicker as ReactDayPicker } from "react-day-picker";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { FormControl } from "./form";

export type DayPickerProps = React.ComponentProps<typeof ReactDayPicker> & {
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  mode: "single";
};

export function DayPicker({ ...props }: DayPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !props.selected && "text-muted-foreground",
            )}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {props.selected ? (
              formatDate(props.selected, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto bg-zinc-950 p-0" align="start">
        <Calendar
          {...props}
          mode={props.mode ?? "single"}
          onSelect={(
            selected: any,
            triggerDate: Date,
            modifiers: Modifiers,
            e: any,
          ) => {
            if (props.onSelect)
              props.onSelect(selected, triggerDate, modifiers, e);
            setIsOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
