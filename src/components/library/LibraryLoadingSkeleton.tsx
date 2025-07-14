
import { Skeleton } from "@/components/ui/skeleton";

const LibraryLoadingSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="text-center animate-pulse">
        <Skeleton className="h-16 w-16 mx-auto mb-4 bg-slate-700 rounded-full" />
        <Skeleton className="h-10 w-64 mx-auto mb-2 bg-slate-700" />
        <Skeleton className="h-6 w-48 mx-auto bg-slate-700" />
      </div>

      {/* Games Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-slate-800/50 rounded-lg overflow-hidden">
              <Skeleton className="h-48 w-full bg-slate-700" />
              <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-3/4 bg-slate-700" />
                <div className="flex space-x-2">
                  <Skeleton className="h-4 w-16 bg-slate-700" />
                  <Skeleton className="h-4 w-20 bg-slate-700" />
                </div>
                <Skeleton className="h-16 w-full bg-slate-700" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 flex-1 bg-slate-700" />
                  <Skeleton className="h-10 w-12 bg-slate-700" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryLoadingSkeleton;
