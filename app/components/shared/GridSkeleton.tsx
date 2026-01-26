import { Skeleton } from "@/components/ui/skeleton";

export default function GridSkeleton() {
  return (
    <div className="flex flex-col space-y-3 container mx-auto">
      <Skeleton className="w-full h-[15.625rem] rounded-lg" />

      <Skeleton className="h-5 w-full" />

      <div className="flex items-center gap-x-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );
}
