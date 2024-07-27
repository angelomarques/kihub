"use client";

import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import { Button, buttonVariants } from "../button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { MONTHS, MonthType, YEARS } from "./constants";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps & { onChange?: React.ChangeEventHandler<HTMLSelectElement> }) {
  const [month, setMonth] = React.useState<MonthType>(
    MONTHS[new Date().getMonth()],
  );
  const [year, setYear] = React.useState<string>(
    new Date().getFullYear().toString(),
  );
  const monthDate = new Date(`${year}, ${month} 2`);

  function handlePrevMonth() {
    if (monthDate.getMonth() !== 0) {
      setMonth(MONTHS[monthDate.getMonth() - 1]);
      return;
    }

    setMonth(MONTHS[11]);
    setYear((prevYear) => {
      return String(Number(prevYear) - 1);
    });
  }

  function handleNextMonth() {
    if (monthDate.getMonth() !== 11) {
      setMonth(MONTHS[monthDate.getMonth() + 1]);
      return;
    }

    setMonth(MONTHS[0]);
    setYear((prevYear) => {
      return String(Number(prevYear) + 1);
    });
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      month={monthDate}
      classNames={{
        //   months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        //   month: "space-y-4",
        //   caption_start: "is-start",
        //   caption_between: "is-between",
        //   caption_end: "is-end",
        //   caption: "flex justify-center pt-1 relative items-center gap-1",
        //   caption_label:
        //     "flex h-7 text-sm font-medium justify-center items-center grow [.is-multiple_&]:flex",
        //   caption_dropdowns: "flex justify-center gap-1 grow dropdowns pl-8 pr-9",
        //   multiple_months: "is-multiple",
        //   vhidden:
        //     "hidden [.is-between_&]:flex [.is-end_&]:flex [.is-start.is-end_&]:hidden",
        //   nav: "flex items-center [&:has([name='previous-month'])]:order-first [&:has([name='next-month'])]:order-last gap-1",
        //   nav_button: cn(
        //     buttonVariants({ variant: "outline" }),
        //     "h-7 w-7 bg-transparent p-0 text-muted-foreground",
        //   ),
        //   nav_button_previous: "absolute left-1",
        //   nav_button_next: "absolute right-1",
        //   table: "w-full border-collapse space-y-1",
        //   head_row: "flex",
        //   head_cell:
        //     "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        //   row: "flex w-full mt-2",
        //   cell: cn(
        //     "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
        //     props.mode === "range"
        //       ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
        //       : "[&:has([aria-selected])]:rounded-md",
        //   ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        ),
        //   day_range_start: "day-range-start",
        //   day_range_end: "day-range-end",
        //   day_selected:
        //     "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-green-500",
        weekday: "h-9 w-9 p-0",
        weekdays: "flex",
        // week_number_header: "text-muted-foreground",
        //   day_outside: "text-muted-foreground opacity-50",
        //   day_disabled: "text-muted-foreground opacity-50",
        //   day_range_middle:
        //     "aria-selected:bg-accent aria-selected:text-accent-foreground",
        //   day_hidden: "invisible",
      }}
      components={{
        // Dropdown: ({ value, onChange, children, ...props }: DropdownProps) => {
        //   const options = React.Children.toArray(
        //     children,
        //   ) as React.ReactElement<React.HTMLProps<HTMLOptionElement>>[];
        //   const selected = options.find((child) => child.props.value === value);
        //   const handleChange = (value: string) => {
        //     const changeEvent = {
        //       target: { value },
        //     } as React.ChangeEvent<HTMLSelectElement>;
        //     onChange?.(changeEvent);
        //   };
        //   return (
        //     <Select
        //       value={value?.toString()}
        //       onValueChange={(value) => {
        //         handleChange(value);
        //       }}
        //     >
        //       <SelectTrigger className="pr-1.5 focus:ring-0">
        //         <SelectValue>{selected?.props?.children}</SelectValue>
        //       </SelectTrigger>
        //       <SelectContent position="popper">
        //         <ScrollArea className="h-80">
        //           {options.map((option, id: number) => (
        //             <SelectItem
        //               key={`${option.props.value}-${id}`}
        //               value={option.props.value?.toString() ?? ""}
        //             >
        //               {option.props.children}
        //             </SelectItem>
        //           ))}
        //         </ScrollArea>
        //       </SelectContent>
        //     </Select>
        //   );
        // },
        MonthCaption: () => {
          return (
            <div className="flex gap-3 py-3">
              <MonthSelect
                date={monthDate}
                onChange={(value) => setMonth(value)}
              />
              <YearSelect year={year} onChange={(value) => setYear(value)} />
            </div>
          );
        },
        Nav: ({}) => (
          <div className="flex items-center justify-between gap-2">
            <Button
              onClick={handlePrevMonth}
              variant="ghost"
              className="h-8 w-8"
              size="icon"
            >
              <ChevronLeftIcon className="h-4 w-4 text-zinc-100" />
            </Button>
            <p>{format(monthDate, "MMMM yyyy")}</p>
            <Button
              onClick={handleNextMonth}
              variant="ghost"
              className="h-8 w-8"
              size="icon"
            >
              <ChevronRightIcon className="h-4 w-4 text-zinc-100" />
            </Button>
          </div>
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

interface MonthSelectProps {
  date: Date;
  onChange: (month: MonthType) => void;
}

function MonthSelect({ date, onChange }: MonthSelectProps) {
  return (
    <Select
      value={MONTHS[date.getMonth()]}
      onValueChange={(value: MonthType) => onChange(value)}
    >
      <SelectTrigger className="pr-1.5 focus:ring-0">
        <SelectValue></SelectValue>
      </SelectTrigger>
      <SelectContent position="popper">
        {MONTHS.map((month, id: number) => (
          <SelectItem key={`${month}-${id}`} value={month}>
            {month}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface YearSelectProps {
  year: string;
  onChange: (year: string) => void;
}

function YearSelect({ year, onChange }: YearSelectProps) {
  return (
    <Select value={year} onValueChange={(value) => onChange(value)}>
      <SelectTrigger className="pr-1.5 focus:ring-0">
        <SelectValue></SelectValue>
      </SelectTrigger>
      <SelectContent position="popper">
        {YEARS.map((year, id: number) => (
          <SelectItem key={`${year}-${id}`} value={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { Calendar };
