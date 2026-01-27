"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface NavigationButtonProps {
  href: string;
  title: string;
  showArrow?: boolean;
}

export default function NavigationButton({
  href,
  title,
  showArrow = true,
}: NavigationButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <Button
      className="w-full bg-red-500 hover:bg-red-600 rounded-lg font-medium flex items-center cursor-pointer dark:text-white justify-center gap-2"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          <span>{title}</span>
          {showArrow && (
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </>
      )}
    </Button>
  );
}
