"use client";

import { Suspense, use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import MobileFixedFooter from "@/components/layout/MobileFixedFooter";
import PageHeader from "@/components/layout/PageHeader";
import CompareTable, {
  CompareProductHeader,
} from "@/components/compare/CompareTable";
import { getProductById } from "@/lib/mock-products";
import { CompareTableSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/Toast";

type PageProps = {
  params: Promise<{ boxId: string }>;
};

function CompareResultContent({ boxId }: { boxId: string }) {
  const searchParams = useSearchParams();
  const selectedParam = searchParams.get("selected") ?? "";
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const selectedIds = selectedParam.split(",").filter(Boolean);

  const products = useMemo(
    () =>
      selectedIds
        .map((id) => getProductById(id))
        .filter((p): p is NonNullable<typeof p> => !!p),
    [selectedIds],
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (hasError) {
    return (
      <div className="flex min-h-full flex-col">
        <PageHeader
          title="제품 비교하기"
          backHref={`/compare/${boxId}`}
        />
        <ErrorState onRetry={() => setHasError(false)} />
        <BottomNav />
      </div>
    );
  }

  if (products.length < 2) {
    return (
      <div className="flex min-h-full flex-col">
        <PageHeader
          title="제품 비교하기"
          backHref={`/compare/${boxId}`}
        />
        <p className="px-4 py-8 text-center text-sm text-[#888]">
          비교할 상품을 2개 이상 선택해주세요.
        </p>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col bg-white pb-nav-cta">
      <PageHeader title="제품 비교하기" backHref={`/compare/${boxId}`} centered />

      <div className="flex-1">
        {loading ? (
          <>
            <CompareTableSkeleton />
          </>
        ) : (
          <>
            <CompareProductHeader products={products} />
            <CompareTable products={products} />
          </>
        )}
      </div>

      <MobileFixedFooter bottom={56} className="border-t-0 bg-transparent shadow-none">
        <div className="bg-white px-4 py-3">
          <Link
            href={`/compare/${boxId}/guide?selected=${selectedIds.join(",")}`}
            className="flex w-full items-center justify-center rounded-lg bg-[#48c7cf] py-3.5 text-sm font-bold text-white"
          >
            의사 결정 가이드 보기
          </Link>
        </div>
      </MobileFixedFooter>

      <BottomNav />
    </div>
  );
}

export default function CompareResultPage({ params }: PageProps) {
  const { boxId } = use(params);

  return (
    <Suspense
      fallback={
        <div className="flex min-h-full flex-col">
          <PageHeader title="제품 비교하기" backHref={`/compare/${boxId}`} />
          <CompareTableSkeleton />
          <BottomNav />
        </div>
      }
    >
      <CompareResultContent boxId={boxId} />
    </Suspense>
  );
}
