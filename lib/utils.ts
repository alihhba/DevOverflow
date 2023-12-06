import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const diff = now.getTime() - createdAt?.getTime();
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
  } else if (days >= 2) {
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
  } else {
    return "Just now";
  }
};

export const getFormattedDate = (num: Date): string => {
  const isoDate = num;
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};

export const formatNumber = (num: number): string => {
  if (num > 1000000) {
    const formattedNum = (num / 1000000).toFixed(1);
    return `${formattedNum}M`;
  } else if (num > 1000) {
    const formattedNum = (num / 1000).toFixed(1);
    return `${formattedNum}K`;
  } else {
    return num?.toString();
  }
};

interface urlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export async function UrlQuery({ params, key, value }: urlQueryParams) {
  const currentUrl = qs.parse(params);

  if (key === "q" && currentUrl[key] !== value) {
    currentUrl.page = "1";
  }
  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true, skipEmptyString: true }
  );
}

interface deleteEmptyQueryUrlProps {
  params: string;
  keys: string[];
}

export async function deleteEmptyQueryUrl({
  params,
  keys,
}: deleteEmptyQueryUrlProps) {
  const currentUrl = qs.parse(params);

  keys.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}
