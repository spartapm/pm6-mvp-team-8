"use client";

import { use, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CompareTooltip from "@/components/product/CompareTooltip";
import CompatibilityScoreBadge from "@/components/product/CompatibilityScoreBadge";
import { MobileAnchoredRight } from "@/components/layout/MobileAnchored";
import MobileFixedFooter from "@/components/layout/MobileFixedFooter";
import {
  getMobileFrame,
  getMobileScrollContainer,
} from "@/lib/mobile-scroll";
import { getProductById, formatPrice, formatRating } from "@/lib/mock-products";
import { useCompare } from "@/lib/compare-store";
import { ProductDetailSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/Toast";
import ToastContainer from "@/components/ui/Toast";

type PageProps = {
  params: Promise<{ id: string }>;
};

const INACTIVE = "cursor-not-allowed";

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 border-b border-[#f5f5f5] py-3.5 text-sm">
      <span className="w-16 shrink-0 text-[#aaa]">{label}</span>
      <div className="min-w-0 flex-1 text-[#333]">{children}</div>
    </div>
  );
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { toggleProductInCategory, isProductInCategoryBox, showToast } =
    useCompare();
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [inCompare, setInCompare] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [scoreCollapsed, setScoreCollapsed] = useState(false);
  const [badgeTop, setBadgeTop] = useState<number | null>(null);
  const imageSectionRef = useRef<HTMLDivElement>(null);

  const product = getProductById(id);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const scrollContainer = getMobileScrollContainer();
    if (!scrollContainer) return;

    const handleScroll = () => {
      setScoreCollapsed(scrollContainer.scrollTop > 8);
    };

    handleScroll();
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () =>
      scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const imageSection = imageSectionRef.current;
    const scrollContainer = getMobileScrollContainer();
    if (!imageSection || !scrollContainer) return;

    const updateBadgeTop = () => {
      const frame = getMobileFrame();
      if (!frame) return;

      const imageTop =
        imageSection.getBoundingClientRect().top -
        frame.getBoundingClientRect().top +
        scrollContainer.scrollTop;

      // 모바일 프레임 기준: 이미지 하단 bottom-8(32px), 펼침 높이 108px
      setBadgeTop(imageTop + imageSection.offsetHeight - 32 - 108);
    };

    updateBadgeTop();

    const resizeObserver = new ResizeObserver(updateBadgeTop);
    resizeObserver.observe(imageSection);

    window.addEventListener("resize", updateBadgeTop);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateBadgeTop);
    };
  }, [loading]);

  useEffect(() => {
    if (product) {
      setInCompare(
        isProductInCategoryBox(
          product.id,
          product.mainCategory,
          product.subCategory,
        ),
      );
    }
  }, [product, isProductInCategoryBox]);

  const handleCompareToggle = () => {
    if (!product) return;
    const result = toggleProductInCategory(
      product.mainCategory,
      product.subCategory,
      product.id,
    );
    setInCompare(result.added);
    if (result.added) {
      showToast("상품을 담았어요. 비교함 탭에서 확인하세요.", {
        label: "비교함",
        href: `/compare/${result.boxId}`,
      });
    } else {
      showToast("비교함에서 뺐어요.");
    }
  };

  if (hasError) {
    return (
      <div className="flex min-h-full flex-col">
        <ErrorState onRetry={() => setHasError(false)} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-full flex-col">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center px-6">
        <p className="text-sm text-[#888]">상품 정보를 불러올 수 없어요.</p>
      </div>
    );
  }

  const volumeDetail =
    product.volumeDetail ?? (product.volume ? product.volume : "-");

  return (
    <div className="relative flex min-h-full flex-col bg-white pb-[calc(4.75rem+var(--safe-area-bottom))]">
      {badgeTop !== null && (
        <MobileAnchoredRight top={badgeTop}>
          <CompatibilityScoreBadge
            score={product.compatibilityScore}
            collapsed={scoreCollapsed}
            onExpand={() => setScoreCollapsed(false)}
          />
        </MobileAnchoredRight>
      )}

      <div ref={imageSectionRef} className="relative">
        <div className="relative aspect-square w-full bg-[#eef6f8]">
          <Image
            src={product.detailImage ?? product.image}
            alt={product.name}
            fill
            className={
              product.detailImage ? "object-cover" : "object-contain p-8"
            }
            sizes="390px"
            priority
          />
        </div>

        <header className="absolute top-0 z-20 flex w-full items-center justify-between px-3 pt-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => history.back()}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm"
              aria-label="뒤로가기"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="#1a1a1a"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm"
              aria-label="홈"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z"
                  stroke="#1a1a1a"
                  strokeWidth="1.8"
                />
              </svg>
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <span
              aria-disabled="true"
              className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm ${INACTIVE}`}
              aria-label="공유"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3v10M8 7l4-4 4 4M5 14v5a2 2 0 002 2h10a2 2 0 002-2v-5"
                  stroke="#1a1a1a"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span
              aria-disabled="true"
              className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm ${INACTIVE}`}
              aria-label="검색"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="#1a1a1a" strokeWidth="1.8" />
                <path
                  d="M20 20l-3-3"
                  stroke="#1a1a1a"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span
              aria-disabled="true"
              className={`relative flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm ${INACTIVE}`}
              aria-label="장바구니"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 8h12l-1 13H7L6 8z"
                  stroke="#1a1a1a"
                  strokeWidth="1.8"
                />
                <path
                  d="M9 8V6a3 3 0 016 0v2"
                  stroke="#1a1a1a"
                  strokeWidth="1.8"
                />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#48c7cf] px-1 text-[10px] font-bold text-white">
                2
              </span>
            </span>
          </div>
        </header>

      </div>

      <div className="relative px-4 pt-4">
        <span
          aria-disabled="true"
          className={`flex items-center gap-0.5 text-sm text-[#888] ${INACTIVE}`}
        >
          {product.brand}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>

        <h1 className="mt-1 pr-10 text-[17px] font-bold leading-snug text-[#1a1a1a]">
          {product.name}
        </h1>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            <span className="text-[#f5a623]">★</span>
            <span className="font-semibold">{formatRating(product.rating)}</span>
            <span className="text-[#aaa]">
              ({product.reviewCount.toLocaleString()})
            </span>
          </div>
          <span
            aria-disabled="true"
            className={`text-xs text-[#888] underline ${INACTIVE}`}
          >
            성분 구성 보기
          </span>
        </div>

        <div className="mt-4">
          <p className="text-xs text-[#aaa]">최저가</p>
          {product.originalPrice && (
            <p className="mt-0.5 text-sm text-[#ccc] line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
          <div className="mt-0.5 flex items-baseline gap-1.5">
            {product.discountRate !== undefined && (
              <span className="text-xl font-bold text-[#e44]">
                {product.discountRate}%
              </span>
            )}
            <span className="text-2xl font-bold text-[#1a1a1a]">
              {formatPrice(product.price)}
            </span>
          </div>
          {product.freeShipping && (
            <div className="mt-1 flex items-center gap-1 text-xs text-[#aaa]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 12h2l2-5h10l2 5h2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect
                  x="2"
                  y="12"
                  width="20"
                  height="8"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              무료배송
            </div>
          )}
        </div>
      </div>

      <div className="mt-2 px-4">
        <DetailRow label="용량">{volumeDetail}</DetailRow>
        <DetailRow label="랭킹">
          {product.subCategory} {product.ranking}위
        </DetailRow>
        <DetailRow label="수상">
          {product.awardDetails ? (
            <div className="space-y-0.5">
              {product.awardDetails.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          ) : product.award ? (
            <p>
              {product.award.year}년 뷰티어워드{" "}
              <span className="text-[#aaa]">{product.award.categoryRank}</span>
            </p>
          ) : (
            "-"
          )}
        </DetailRow>
        <DetailRow label="배송비">
          <p className="font-medium text-[#48c7cf]">무료배송</p>
          <p className="mt-0.5">CJ대한통운</p>
          <p className="mt-1 text-xs text-[#aaa]">
            제주, 도서산간지역 3,000원 추가
          </p>
        </DetailRow>
        <DetailRow label="정품인증">
          화해 모든 상품은 100% 정품입니다
        </DetailRow>
      </div>

      <div className="relative mt-4 px-4">
        <div className="relative flex rounded-lg border border-[#eee]">
          <div className="relative flex-1">
            <CompareTooltip
              visible={showTooltip}
              onClose={() => setShowTooltip(false)}
            />
            <button
              type="button"
              onClick={handleCompareToggle}
              className={`flex w-full items-center justify-center gap-2 rounded-l-lg py-3.5 text-sm font-medium ${
                inCompare
                  ? "bg-[#48c7cf] text-white"
                  : "bg-white text-[#666]"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded border text-xs ${
                  inCompare
                    ? "border-white/60 text-white"
                    : "border-[#ccc] text-[#999]"
                }`}
              >
                +
              </span>
              비교함 담기
            </button>
          </div>
          <div className="w-px bg-[#eee]" />
          <span
            aria-disabled="true"
            className={`flex flex-1 items-center justify-center gap-2 bg-white py-3.5 text-sm font-medium text-[#666] ${INACTIVE}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 4h16v16l-8-5-8 5V4z"
                stroke="#999"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            즐겨찾기
          </span>
        </div>
      </div>

      <span
        aria-disabled="true"
        className={`mt-4 block w-full bg-[#5d5f97] py-4 text-center text-sm font-semibold text-white ${INACTIVE}`}
      >
        {product.subCategory}의 다른 샘플 {product.sampleCount ?? 3}개 보기
      </span>

      <MobileFixedFooter>
        <div className="flex items-center gap-2 px-3 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
          <span
            aria-disabled="true"
            className={`flex w-12 shrink-0 flex-col items-center justify-center gap-0.5 text-[10px] text-[#888] ${INACTIVE}`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21s-7-4.5-7-10a4 4 0 017-2 4 4 0 017 2c0 5.5-7 10-7 10z"
                stroke="#999"
                strokeWidth="1.8"
                fill="none"
              />
            </svg>
            찜하기
          </span>
          <span
            aria-disabled="true"
            className={`flex flex-1 items-center justify-center rounded-lg border border-[#48c7cf] bg-white py-3 text-sm font-semibold text-[#48c7cf] ${INACTIVE}`}
          >
            장바구니 담기
          </span>
          <span
            aria-disabled="true"
            className={`flex flex-1 items-center justify-center rounded-lg bg-[#48c7cf] py-3 text-sm font-bold text-white ${INACTIVE}`}
          >
            바로 구매
          </span>
        </div>
      </MobileFixedFooter>

      <ToastContainer />
    </div>
  );
}
