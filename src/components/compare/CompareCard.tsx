"use client";

import Image from "next/image";
import Link from "next/link";
import { getCompareBoxTitle } from "@/lib/categories";
import { getProductById } from "@/lib/mock-products";
import type { CompareBox } from "@/lib/types";

type CompareCardProps = {
  box: CompareBox;
};

function ProductImagePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`shrink-0 rounded-lg border-2 border-white bg-[#f0f0f0] ${className}`}
      aria-hidden
    />
  );
}

function ProductThumb({
  productId,
  className = "",
}: {
  productId: string;
  className?: string;
}) {
  const product = getProductById(productId);

  if (!product) {
    return <ProductImagePlaceholder className={className} />;
  }

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-lg border-2 border-white bg-white ${className}`}
    >
      <Image
        src={product.image}
        alt={product.shortName ?? product.name}
        fill
        className="object-contain p-1"
        sizes="56px"
      />
    </div>
  );
}

export default function CompareCard({ box }: CompareCardProps) {
  const count = box.productIds.length;
  const visibleIds = box.productIds.slice(0, 3);
  const hasMore = count > 3;

  return (
    <Link
      href={`/compare/${box.id}`}
      className="flex items-center gap-3 rounded-xl border border-[#eee] bg-white p-4 transition-colors active:bg-[#fafafa]"
    >
      <div className="flex -space-x-2">
        {count > 0 ? (
          <>
            {visibleIds.map((productId) => (
              <ProductThumb key={productId} productId={productId} className="h-14 w-14" />
            ))}
            {hasMore && (
              <div className="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-white bg-[#e8e8e8] text-xs font-medium text-[#666]">
                +{count - 3}
              </div>
            )}
          </>
        ) : (
          <ProductImagePlaceholder className="h-14 w-14" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#1a1a1a]">
          {getCompareBoxTitle(box.subCategory)}
        </p>
        <p className="mt-0.5 text-xs text-[#888]">{count}개 상품</p>
      </div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0 text-[#ccc]"
      >
        <path
          d="M9 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </Link>
  );
}
