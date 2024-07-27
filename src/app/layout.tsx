import { Logo } from "@/assets/logo";
import { buttonVariants } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import {
  getAuthenticatedUser,
  getUserByUsername,
} from "@/server/users/queries";
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
import { ReactNode } from "react";
import { MobileSidebar } from "./_components/mobile-sidebar";
import { NavLink } from "./_components/nav-link";
import { Providers } from "./_components/providers";
import { SidebarUserInfo } from "./_components/sidebar-user-info";
import "./globals.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

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

  const queryClient = new QueryClient();

  if (user) {
    await queryClient.prefetchQuery({
      queryKey: ["users", user.username],
      queryFn: async () => {
        const response = await getUserByUsername(user.username);

        return response;
      },
    });
  }

  return (
    <aside className="hidden h-full flex-col bg-zinc-950 py-8 pl-6 sm:flex">
      <Link
        href="/"
        className={buttonVariants({
          className: "ml-4",
          variant: "ghost",
          size: "icon-lg",
        })}
      >
        <Logo className="h-10 w-10" />
      </Link>

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

          {user && (
            <li>
              <NavLink
                href="/users/me"
                icon={<UserIcon className="h-10 w-10" />}
                selectedIcon={<UserSolidIcon className="h-10 w-10" />}
              >
                Profile
              </NavLink>
            </li>
          )}
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
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SidebarUserInfo username={user.username} />
        </HydrationBoundary>
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
