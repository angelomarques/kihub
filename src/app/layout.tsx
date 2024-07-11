import { Logo } from "@/assets/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { getAuthenticatedUser } from "@/server/users/queries";
import {
  HomeIcon as HomeSolidIcon,
  UserIcon as UserSolidIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowRightEndOnRectangleIcon,
  HomeIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { MobileSidebar } from "./_components/mobile-sidebar";
import { NavLink } from "./_components/nav-link";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./_components/providers";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description:
    "Kihub is a blogging platform built with Next.js, Drizzle ORM, and Tailwind CSS.",
  icons: ["/kihub.svg"],
};

interface Props {
  children: ReactNode;
  modal: ReactNode;
}

export default function RootLayout({ children, modal }: Props) {
  return (
    <html lang="en">
      <Providers>
        <body className={clsx(inter.className, "dark")}>
          <div className="flex items-center justify-center">
            <div className="grid h-screen flex-1 grid-cols-1 sm:flex-initial sm:grid-cols-[120px,minmax(200px,600px),120px] lg:grid-cols-[320px,minmax(200px,600px),320px]">
              <Sidebar />

              <div className="h-screen w-full overflow-y-scroll border-x border-x-zinc-100/20">
                <Header />
                {children}
                {modal}
              </div>

              <div className="hidden sm:block"></div>
            </div>
          </div>
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}

async function Header() {
  const user = await getAuthenticatedUser();

  return (
    <header className="flex items-center justify-center border-b border-b-zinc-100/20 p-4 sm:hidden">
      <MobileSidebar user={user} />

      <Link href="/" className="-ml-10 mr-auto">
        <Logo className="h-12 w-12" />
      </Link>
    </header>
  );
}

async function Sidebar() {
  const user = await getAuthenticatedUser();

  return (
    <aside className="hidden h-full flex-col bg-zinc-950 py-8 pl-6 sm:flex">
      <Button variant="ghost" size="icon-lg" className="ml-4">
        <Logo className="h-10 w-10" />
      </Button>

      <nav className="mt-12">
        <ul>
          <li>
            <NavLink
              href="/"
              icon={<HomeIcon className="h-10 w-10" />}
              selectedIcon={<HomeSolidIcon className="h-10 w-10" />}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              href="/profile"
              icon={<UserIcon className="h-10 w-10" />}
              selectedIcon={<UserSolidIcon className="h-10 w-10" />}
            >
              Profile
            </NavLink>
          </li>

          <li>
            <LogoutLink className="flex w-fit items-center gap-5 rounded-xl px-5 py-3 text-lg hover:bg-zinc-600/20">
              <ArrowRightEndOnRectangleIcon className="h-10 w-10" />

              <span className="hidden lg:inline">Log out</span>
            </LogoutLink>
          </li>

          <li>
            <Link
              href="compose/post"
              className={buttonVariants({
                className: "mt-3 w-5/6 py-3",
              })}
            >
              <PencilSquareIcon className="h-8 w-8 lg:hidden" />
              <span className="hidden lg:inline">Post</span>
            </Link>
          </li>
        </ul>
      </nav>

      {user ? (
        <div className="mt-auto flex items-center gap-2">
          <UserAvatar picture={user.picture} username={user.username} />
          <div className="hidden lg:block">
            <Link
              href={`/${user.username}`}
              className="mt-1.5 block font-medium hover:underline"
            >
              {`${user.firstName} ${user.lastName}`}
            </Link>
            <p className="mt-1 text-sm text-zinc-400">@{user.username}</p>
          </div>
        </div>
      ) : (
        <LoginLink
          className={buttonVariants({ className: "my-4 mt-auto w-5/6" })}
        >
          Log in
        </LoginLink>
      )}
    </aside>
  );
}
