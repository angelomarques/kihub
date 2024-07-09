import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

export const formatTimeAgoShort = (date: Date) => {
  const now = new Date();
  const seconds = differenceInSeconds(now, date);
  if (seconds < 60) return `${seconds}s`;

  const minutes = differenceInMinutes(now, date);
  if (minutes < 60) return `${minutes}m`;

  const hours = differenceInHours(now, date);
  if (hours < 24) return `${hours}h`;

  const days = differenceInDays(now, date);
  if (days < 7) return `${days}d`;

  return date.toLocaleDateString();
};
