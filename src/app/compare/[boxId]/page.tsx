"use client";

import { use, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import MobileFixedFooter from "@/components/layout/MobileFixedFooter";
import PageHeader from "@/components/layout/PageHeader";
import ProductSlot from "@/components/compare/ProductSlot";
import { useCompare } from "@/lib/compare-store";
import { getCompareBoxTitle } from "@/lib/categories";
import { getProductById } from "@/lib/mock-products";
import { ProductSlotSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/Toast";
import ToastContainer from "@/components/ui/Toast";

type PageProps = {
  params: Promise<{ boxId: string }>;
};

export default function CompareBoxPage({ params }: PageProps) {
  const { boxId } = use(params);
  const router = useRouter();
  const { boxes, isLoading, hasError, retryLoad } = useCompare();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const box = boxes.find((b) => b.id === boxId);

  const products = useMemo(
    () =>
      box?.productIds
        .map((id) => getProductById(id))
        .filter((p): p is NonNullable<typeof p> => !!p) ?? [],
    [box],
  );

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((pid) => pid !== id);
      }
      return [...prev, id];
    });
  };

  const canCompare = selectedIds.length >= 2;

  const handleCompare = () => {
    if (!canCompare) return;
    router.push(
      `/compare/${boxId}/result?selected=${selectedIds.join(",")}`,
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-full flex-col">
        <PageHeader title="비교함" backHref="/compare" centered />
        <ProductSlotSkeleton />
        <BottomNav />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex min-h-full flex-col">
        <PageHeader title="비교함" backHref="/compare" centered />
        <ErrorState onRetry={retryLoad} />
        <BottomNav />
      </div>
    );
  }

  if (!box) {
    return (
      <div className="flex min-h-full flex-col">
        <PageHeader title="비교함" backHref="/compare" centered />
        <p className="px-4 py-8 text-center text-sm text-[#888]">
          비교함을 찾을 수 없어요.
        </p>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col bg-white pb-nav-cta">
      <PageHeader
        title={getCompareBoxTitle(box.subCategory)}
        backHref="/compare"
        centered
        subtitle="비교할 제품을 선택해주세요."
      />

      <div className="grid grid-cols-3 gap-2 px-4 pt-1">
        {products.map((product) => (
          <ProductSlot
            key={product.id}
            product={product}
            selected={selectedIds.includes(product.id)}
            onToggle={() => toggleSelect(product.id)}
          />
        ))}
        <ProductSlot
          isAddSlot
          onAdd={() => router.push(`/compare/${boxId}/ranking`)}
        />
      </div>

      <MobileFixedFooter bottom={56} className="border-t-0 bg-transparent shadow-none">
        <div className="bg-white px-4 py-3">
          <button
            type="button"
            disabled={!canCompare}
            onClick={handleCompare}
            className={`w-full rounded-lg py-3.5 text-sm font-bold ${
              canCompare
                ? "bg-[#48c7cf] text-white"
                : "bg-[#eee] text-[#bbb]"
            }`}
          >
            비교 시작하기
          </button>
        </div>
      </MobileFixedFooter>

      <BottomNav />
      <ToastContainer />
    </div>
  );
}
