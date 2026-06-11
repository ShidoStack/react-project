import React from 'react';

export default function LoadingSkeleton({ className = "", rounded = "rounded-xl" }) {
  return (
    <div className={`skeleton ${rounded} ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="premium-card p-4 flex flex-col gap-4">
      <LoadingSkeleton className="w-full aspect-[4/3] rounded-xl" />
      <div className="space-y-2">
        <LoadingSkeleton className="h-5 w-3/4" />
        <LoadingSkeleton className="h-4 w-1/2" />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <LoadingSkeleton className="h-4 w-1/4" />
        <LoadingSkeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  );
}
