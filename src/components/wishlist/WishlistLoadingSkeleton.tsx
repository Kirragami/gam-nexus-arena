
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from 'react-router-dom';
import { Gamepad2 } from "lucide-react";

const WishlistLoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center border-b border-slate-700">
        <Skeleton className="h-8 w-32 bg-slate-700" />
        <Skeleton className="h-8 w-24 bg-slate-700" />
      </nav>

      <div className="container mx-auto px-6 py-8">
        <Skeleton className="h-12 w-48 mb-8 bg-slate-700" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-96 bg-slate-700 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistLoadingSkeleton;
