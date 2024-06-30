"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
  icon: ReactNode;
  selectedIcon: ReactNode;
}

export function NavLink({ href, children, icon, selectedIcon }: Props) {
  const pathname = usePathname();

  function isCurrentPath(path: string) {
    return pathname === path;
  }

  return (
    <Link
      href={href}
      className={clsx(
        "flex w-fit items-center gap-5 rounded-xl px-5 py-3 text-lg hover:bg-zinc-600/20",
        { "font-bold": isCurrentPath(href) },
      )}
    >
      {isCurrentPath(href) ? selectedIcon : icon}

      <span className="hidden lg:inline">{children}</span>
    </Link>
  );
}
