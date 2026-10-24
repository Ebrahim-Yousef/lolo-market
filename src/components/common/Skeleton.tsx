import React from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-slate-200/80 dark:bg-indigo-950/40 rounded-xl ${className}`}
    />
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#131629] rounded-3xl border border-slate-200/70 dark:border-indigo-950/80 p-4 flex flex-col space-y-3 shadow-xs">
      <Skeleton className="w-full aspect-square rounded-2xl" />
      <Skeleton className="w-1/3 h-4" />
      <Skeleton className="w-3/4 h-5" />
      <Skeleton className="w-1/2 h-4" />
      <div className="pt-2 flex items-center justify-between">
        <Skeleton className="w-1/4 h-6" />
        <Skeleton className="w-10 h-10 rounded-xl" />
      </div>
    </div>
  );
};
