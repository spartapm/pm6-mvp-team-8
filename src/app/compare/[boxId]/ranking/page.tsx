"use client";

import { use, useMemo, useState } from "react";
import RankingHeader from "@/components/ranking/RankingHeader";
import RankingProductCard from "@/components/ranking/RankingProductCard";
import { SUB_CATEGORIES } from "@/lib/categories";
import type { MainCategory } from "@/lib/categories";
import { useCompare } from "@/lib/compare-store";
import { getProductsByCategory } from "@/lib/mock-products";
import { ErrorState } from "@/components/ui/Toast";
import ToastContainer from "@/components/ui/Toast";
import type { RankingTab, SkinFilter } from "@/lib/types";

type PageProps = {
  params: Promise<{ boxId: string }>;
};

const RANKING_TABS: RankingTab[] = [
  "급상승",
  "카테고리별",
  "피부별",
  "연령대별",
];

const SKIN_FILTERS: SkinFilter[] = [
  "전체",
  "수분",
  "진정",
  "보습",
  "모공",
  "브라이트닝",
  "안티에이징",
  "트러블",
  "각질",
];

export default function RankingPage({ params }: PageProps) {
  const { boxId } = use(params);
  const { boxes, hasError, retryLoad } = useCompare();
  const [activeTab, setActiveTab] = useState<RankingTab>("카테고리별");
  const [skinFilter, setSkinFilter] = useState<SkinFilter>("전체");
  const box = boxes.find((b) => b.id === boxId);

  const subCategoryChips = useMemo(() => {
    if (!box) return [];
    const subs = SUB_CATEGORIES[box.mainCategory as MainCategory] ?? [];
    return ["전체", ...subs.slice(0, 4)];
  }, [box]);

  const products = useMemo(() => {
    if (!box) return [];
    let list = getProductsByCategory(box.mainCategory, box.subCategory);
    if (skinFilter !== "전체") {
      list = list.filter((p) => p.keywords.includes(skinFilter));
    }
    return list;
  }, [box, skinFilter]);

  if (hasError) {
    return (
      <div className="flex min-h-full flex-col bg-[#fafafa]">
        <RankingHeader backHref={`/compare/${boxId}`} />
        <ErrorState onRetry={retryLoad} />
      </div>
    );
  }

  if (!box) {
    return (
      <div className="flex min-h-full flex-col bg-[#fafafa]">
        <RankingHeader backHref="/compare" />
        <p className="px-4 py-8 text-center text-sm text-[#888]">
          비교함을 찾을 수 없어요.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col bg-[#fafafa]">
      <RankingHeader backHref={`/compare/${boxId}`} />

      <div className="flex gap-2 overflow-x-auto bg-white px-3 py-3">
        {RANKING_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            disabled={tab !== "카테고리별"}
            onClick={() => tab === "카테고리별" && setActiveTab(tab)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
              activeTab === tab
                ? "border border-[#7ee8dc] bg-white text-[#1a1a1a]"
                : "cursor-not-allowed bg-[#f3f3f3] text-[#bbb]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto bg-white px-3 pb-3">
        <button
          type="button"
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#4a4a4a] px-4 py-2 text-sm font-medium text-white"
        >
          {box.mainCategory}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {subCategoryChips.map((chip) => {
          const isActive =
            chip === "전체" ? false : chip === box.subCategory;
          const isDisabled = chip !== "전체" && chip !== box.subCategory;

          return (
            <button
              key={chip}
              type="button"
              disabled={isDisabled}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
                isActive
                  ? "bg-[#4a4a4a] text-white"
                  : isDisabled
                    ? "cursor-not-allowed border border-[#eee] bg-white text-[#ccc]"
                    : "border border-[#e0e0e0] bg-white text-[#1a1a1a]"
              }`}
            >
              {chip.length > 6 ? `${chip.slice(0, 5)}...` : chip}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-3 border-y border-[#eee] bg-white">
        {SKIN_FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setSkinFilter(filter)}
            className={`border-b border-r border-[#f0f0f0] px-2 py-3 text-center text-sm last:border-r-0 ${
              skinFilter === filter
                ? "font-bold text-[#1a1a1a]"
                : "text-[#bbb]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <p className="flex items-center justify-end gap-1 bg-white px-4 py-2 text-[11px] text-[#aaa]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        2026.06.04 업데이트
      </p>

      <div className="flex-1 overflow-y-auto pb-8 pt-1">
        {products.length === 0 ? (
          <p className="py-8 text-center text-sm text-[#888]">
            해당 조건의 상품이 없어요.
          </p>
        ) : (
          products.map((product, index) => (
            <RankingProductCard
              key={product.id}
              product={product}
              rank={index + 1}
              href={`/product/${product.id}`}
            />
          ))
        )}
      </div>

      <ToastContainer />
    </div>
  );
}
