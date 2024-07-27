import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Kihub | 404 - Page not found",
};

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-lg font-medium text-gray-500">Page not found</p>
        <Link href="/" className={buttonVariants({ className: "mt-6" })}>
          Go back home
        </Link>
      </div>
    </div>
  );
}
