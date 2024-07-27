"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface Props {
  children: string;
  hasBackButton?: boolean;
}

export function PageHeader({ children, hasBackButton = true }: Props) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between border-b border-b-zinc-100/20 p-4">
      {hasBackButton ? (
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeftIcon className="h-6 w-6" />
        </Button>
      ) : (
        <ContainerPlaceholder />
      )}

      <h1 className="text-lg font-bold">{children}</h1>
      <ContainerPlaceholder />
    </div>
  );
}

function ContainerPlaceholder() {
  return <div className="h-10 w-10" />;
}
