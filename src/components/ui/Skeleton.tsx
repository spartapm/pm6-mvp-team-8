export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-[#f0f0f0] ${className}`}
      aria-hidden
    />
  );
}

export function CompareListSkeleton() {
  return (
    <div className="space-y-3 px-4 pt-4">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>
  );
}

export function ProductSlotSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-2 px-4 pt-1">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton key={i} className="min-h-[196px] w-full rounded-lg" />
      ))}
    </div>
  );
}

export function RankingListSkeleton() {
  return (
    <div className="space-y-3 px-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex gap-3">
          <Skeleton className="h-20 w-20 shrink-0" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CompareTableSkeleton() {
  return (
    <div>
      <div className="grid grid-cols-4 border-b border-[#eee]">
        <div className="bg-[#f7f7f7] py-8" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2 border-r border-[#eee] px-2 py-4 last:border-r-0">
            <Skeleton className="h-[88px] w-full" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
        ))}
      </div>
      <div className="space-y-0">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <Skeleton key={i} className="h-12 w-full rounded-none" />
        ))}
      </div>
    </div>
  );
}

export function GuideSkeleton() {
  return (
    <div className="space-y-4 px-4 pt-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-3 w-56" />
      <div className="flex gap-2">
        <Skeleton className="h-[30px] w-20 rounded-md" />
        <Skeleton className="h-[30px] flex-1 rounded-md" />
        <Skeleton className="h-[30px] flex-1 rounded-md" />
      </div>
      <Skeleton className="mt-4 h-72 w-full rounded-2xl" />
      <Skeleton className="h-12 w-full rounded-lg" />
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="space-y-3 px-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}
