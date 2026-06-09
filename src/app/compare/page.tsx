"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import CompareCard from "@/components/compare/CompareCard";
import CategoryBottomSheet from "@/components/compare/CategoryBottomSheet";
import { useCompare } from "@/lib/compare-store";
import { CompareListSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/Toast";
import ToastContainer from "@/components/ui/Toast";

export default function ComparePage() {
  const router = useRouter();
  const { boxes, isLoading, hasError, retryLoad, createBox } = useCompare();
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleCreate = (mainCategory: string, subCategory: string) => {
    const box = createBox(mainCategory, subCategory);
    router.push(`/compare/${box.id}`);
  };

  return (
    <div className="flex min-h-full flex-col">
      <div className="border-b border-[#f0f0f0] px-4 py-4">
        <h1 className="text-lg font-bold text-[#1a1a1a]">내 비교함</h1>
      </div>

      <div className="flex-1 pb-nav">
        {isLoading ? (
          <CompareListSkeleton />
        ) : hasError ? (
          <ErrorState onRetry={retryLoad} />
        ) : boxes.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-16 text-center">
            <p className="text-sm text-[#888]">아직 생성된 비교함이 없어요.</p>
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="mt-6 flex items-center gap-2 rounded-xl border-2 border-dashed border-[#00b9a6] px-6 py-4 text-sm font-semibold text-[#00b9a6]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              새 비교함 만들기
            </button>
          </div>
        ) : (
          <div className="space-y-3 px-4 pt-4">
            {boxes.map((box) => (
              <CompareCard key={box.id} box={box} />
            ))}
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#ddd] py-4 text-sm font-semibold text-[#666] active:border-[#00b9a6] active:text-[#00b9a6]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              새 비교함 만들기
            </button>
          </div>
        )}
      </div>

      <BottomNav />
      <ToastContainer />

      <CategoryBottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onSelect={handleCreate}
      />
    </div>
  );
}
