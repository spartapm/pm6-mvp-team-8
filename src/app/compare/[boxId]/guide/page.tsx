"use client";

import { Suspense, use, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import DecisionGuideCard from "@/components/compare/DecisionGuideCard";
import { getProductById } from "@/lib/mock-products";
import { getRecommendedProduct } from "@/lib/recommendation";
import { GuideSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/Toast";

type PageProps = {
  params: Promise<{ boxId: string }>;
};

function DecisionGuideContent({ boxId }: { boxId: string }) {
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

  const recommended = useMemo(
    () => getRecommendedProduct(products),
    [products],
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const resultHref = `/compare/${boxId}/result?selected=${selectedIds.join(",")}`;

  if (hasError) {
    return (
      <div className="flex min-h-full flex-col">
        <PageHeader title="의사 결정 가이드" backHref={resultHref} centered />
        <ErrorState onRetry={() => setHasError(false)} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-full flex-col">
        <PageHeader title="의사 결정 가이드" backHref={resultHref} centered />
        <GuideSkeleton />
      </div>
    );
  }

  if (!recommended) {
    return (
      <div className="flex min-h-full flex-col">
        <PageHeader title="의사 결정 가이드" backHref={resultHref} centered />
        <p className="px-4 py-16 text-center text-sm text-[#888]">
          추천 결과를 생성하지 못했어요.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col bg-white">
      <PageHeader title="의사 결정 가이드" backHref={resultHref} centered />

      <div className="flex-1 pt-2">
        <DecisionGuideCard
          product={recommended}
          totalCount={products.length}
          boxId={boxId}
          selectedIds={selectedIds.join(",")}
        />
      </div>
    </div>
  );
}

export default function DecisionGuidePage({ params }: PageProps) {
  const { boxId } = use(params);

  return (
    <Suspense
      fallback={
        <div className="flex min-h-full flex-col">
          <PageHeader title="의사 결정 가이드" backHref={`/compare/${boxId}/result`} centered />
          <GuideSkeleton />
        </div>
      }
    >
      <DecisionGuideContent boxId={boxId} />
    </Suspense>
  );
}
