"use client";

import Link from "next/link";
import clsx from "clsx";

interface DesktopItemProps {
  label: string;
  onClick?: () => void;
  active?: boolean;
  href: string;
  icon: any;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  onClick,
  active,
  href,
  icon: Icon,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `          
            group
            flex
            gap-x-3
            rounded-md
            p-3
            leading-6
            font-semibold
            text-gray-500
            hover:text-black
            hover:bg-gray-100

            `,
          active && `bg-gray-100 text-sky-600`
        )}
      >
        <Icon className="h-6 shrink-0" />
        <span className="sr-only">{label} </span>
      </Link>
    </li>
  );
};

export default DesktopItem;