import Image from "next/image";
import Link from "next/link";
import { MOCK_USER } from "@/lib/user-profile";
import type { Product } from "@/lib/types";

type DecisionGuideCardProps = {
  product: Product;
  totalCount: number;
  boxId: string;
  selectedIds: string;
};

function getGuideVolume(product: Product) {
  if (product.volumeDetail) {
    const match = product.volumeDetail.match(/\d+ml/);
    if (match) return match[0];
  }
  return product.volume ?? "300ml";
}

export default function DecisionGuideCard({
  product,
  totalCount,
  boxId,
  selectedIds,
}: DecisionGuideCardProps) {
  const resultHref = `/compare/${boxId}/result?selected=${selectedIds}`;
  const volumeLabel = getGuideVolume(product);
  const displayName = `${product.shortName ?? product.name} [${volumeLabel}]`;

  return (
    <div className="px-4 pb-8">
      <p className="text-sm font-medium text-[#48c7cf]">내 피부 기준 추천</p>
      <h2 className="mt-2 text-[22px] font-bold leading-snug text-[#1a1a1a]">
        {totalCount}가지 제품 중
        <br />
        먼저 확인해볼 제품이에요.
      </h2>
      <p className="mt-2 text-xs text-[#aaa]">
        궁합 점수·주의성분·판매 여부를 기준으로 분석했어요
      </p>

      <div className="mt-4 flex gap-2">
        <span className="rounded-md bg-[#f0f0f0] px-3 py-1.5 text-xs text-[#666]">
          {MOCK_USER.skinType} 피부
        </span>
        <span className="h-[30px] flex-1 rounded-md bg-[#f0f0f0]" />
        <span className="h-[30px] flex-1 rounded-md bg-[#f0f0f0]" />
      </div>

      <div className="relative mt-8 rounded-2xl bg-[#e8f6f8] px-4 pb-5 pt-7">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#48c7cf] px-3 py-1 text-[11px] font-bold text-white shadow-sm">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12l5 5L20 7"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            최적 추천
          </span>
        </div>

        <div className="flex gap-3">
          <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-xl bg-white">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-2"
              sizes="88px"
            />
          </div>
          <div className="min-w-0 flex-1 pt-1">
            <p className="text-[11px] text-[#aaa]">[{product.brand}]</p>
            <p className="mt-0.5 line-clamp-2 text-[14px] font-bold leading-snug text-[#1a1a1a]">
              {displayName}
            </p>
            {product.cautionIngredientList.length === 0 ? (
              <span className="mt-2 inline-block rounded-md bg-[#48c7cf] px-2 py-0.5 text-[10px] font-semibold text-white">
                주의성분 없음
              </span>
            ) : (
              <span className="mt-2 inline-block rounded-md bg-[#fff3f3] px-2 py-0.5 text-[10px] font-medium text-[#e44]">
                {product.cautionIngredientList.join(", ")}
              </span>
            )}
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-[#666]">내 피부 궁합 점수</span>
            <span className="text-base font-bold text-[#1a1a1a]">
              {product.compatibilityScore}점
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/80">
            <div
              className="h-full rounded-full bg-[#48c7cf]"
              style={{ width: `${product.compatibilityScore}%` }}
            />
          </div>
        </div>

        <ol className="mt-5 space-y-3">
          {product.recommendationReasons.slice(0, 3).map((reason, i) => (
            <li key={i} className="flex gap-2.5 text-[13px] leading-snug text-[#333]">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#48c7cf]">
                {i + 1}
              </span>
              <span className="pt-0.5">{reason}</span>
            </li>
          ))}
        </ol>
      </div>

      <Link
        href={`/product/${product.id}`}
        className="mt-5 flex w-full items-center justify-center rounded-lg bg-[#48c7cf] py-3.5 text-sm font-bold text-white"
      >
        제품 상세보기
      </Link>
      <Link
        href={resultHref}
        className="mt-2.5 flex w-full items-center justify-center rounded-lg border border-[#ddd] bg-white py-3.5 text-sm font-semibold text-[#48c7cf]"
      >
        비교 결과 다시 보기
      </Link>

      <p className="mt-8 text-center text-[10px] leading-relaxed text-[#ccc]">
        추천 결과는 내 피부 정보·궁합 점수·성분 데이터 기반으로 제공됩니다
        <br />
        광고·협찬과 무관합니다
      </p>
    </div>
  );
}
