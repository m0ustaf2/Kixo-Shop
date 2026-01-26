import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

export default function SubmitBtn({
  action,
  isLoading,
  title,
  titleLoading,
}: {
  action?: () => void;
  isLoading: boolean;
  title: string;
  titleLoading: string;
}) {
  return (
    <>
      <Button
        type="submit"
        onClick={action}
        disabled={isLoading}
        className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            {titleLoading}
          </>
        ) : (
          <>
            {title}
            <ArrowRight className="w-5 h-5 ml-2" />
          </>
        )}
      </Button>
    </>
  );
}
