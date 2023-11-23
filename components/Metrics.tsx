import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface metricsProps {
  imageUrl: string;
  value: string | number;
  title: string;
  isAuthor?: boolean;
  titleClassName?: string;
  href?: string;
  valueClassName?: string;
}

const Metrics = ({
  imageUrl,
  title,
  value,
  href,
  isAuthor,
  titleClassName,
  valueClassName,
}: metricsProps) => {
  const metricContent = (
    <>
      <div className="flex items-center gap-1">
        {isAuthor ? (
          <Image src={imageUrl} height={25} width={25} alt={title}  className="pr-1"/>
        ) : (
          <Image src={imageUrl} height={20} width={20} alt={title} />
        )}

        <p
          className={cn(
            "capitalize text-dark-400  dark:text-light-800",
            valueClassName,
            isAuthor && "dark:text-light-700 "
          )}
        >
          {value}
        </p>

        {isAuthor && <span className="max-md:hidden">|</span>}

        <p
          className={cn(
            "capitalize text-dark-400 small-regular dark:text-light-800",
            titleClassName
          )}
        >
          {title}
        </p>
      </div>
    </>
  );

  if (isAuthor && href) {
    return <Link href={href}>{metricContent}</Link>;
  }

  return <div>{metricContent}</div>;
};

export default Metrics;
