export const YEARS = new Array(new Date().getFullYear() - 1899)
  .fill(0)
  .map((_, i) => String(i + 1900));

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export type MonthType = (typeof MONTHS)[number];
