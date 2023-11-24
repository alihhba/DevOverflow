import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const diff = now.getTime() - createdAt.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (years > 0) {
    if (now.getFullYear() === createdAt.getFullYear()) {
      return createdAt.toLocaleString("default", {
        month: "short",
        day: "numeric",
      });
    } else {
      return createdAt.toLocaleString("default", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  } else if (days >= 30) {
    return createdAt.toLocaleString("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } else  if (days >= 2) {
    return `${days} days ago`;
  } else if (days === 1) {
    return `1 day ago`;
  } else if (hours >= 2) {
    return `${hours} hours ago`;
  } else if (hours === 1) {
    return `1 hour ago`;
  } else if (minutes >= 2) {
    return `${minutes} minutes ago`;
  } else if (minutes === 1) {
    return `1 minute ago`;
  }else {
    return "Just now";
  }
};

export const formatNumber = (num: number): string => {
  if (num > 1000000) {
    const formattedNum = (num / 1000000).toFixed(1);
    return `${formattedNum}M`;
  } else if (num > 1000) {
    const formattedNum = (num / 1000).toFixed(1);
    return `${formattedNum}K`;
  } else {
    return num.toString();
  }
};
