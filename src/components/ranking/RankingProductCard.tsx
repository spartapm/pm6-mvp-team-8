import Image from "next/image";
import Link from "next/link";
import { formatPrice, formatRating } from "@/lib/mock-products";
import type { Product } from "@/lib/types";

type RankingProductCardProps = {
  product: Product;
  rank: number;
  href: string;
};

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="flex w-9 shrink-0 flex-col items-center pt-1">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8c547] text-xs font-bold text-white">
          1
        </div>
        <svg width="14" height="10" viewBox="0 0 14 10" className="mt-0.5 text-[#e8c547]">
          <path d="M2 0h10L11 8H3L2 0z" fill="currentColor" />
          <path d="M0 8h14v2H0z" fill="currentColor" />
        </svg>
      </div>
    );
  }

  if (rank === 2) {
    return (
      <div className="flex w-9 shrink-0 flex-col items-center pt-1">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#b8b8b8] text-xs font-bold text-white">
          2
        </div>
        <svg width="14" height="10" viewBox="0 0 14 10" className="mt-0.5 text-[#b8b8b8]">
          <path d="M2 0h10L11 8H3L2 0z" fill="currentColor" />
          <path d="M0 8h14v2H0z" fill="currentColor" />
        </svg>
      </div>
    );
  }

  if (rank === 3) {
    return (
      <div className="flex w-9 shrink-0 flex-col items-center pt-1">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c98a5a] text-xs font-bold text-white">
          3
        </div>
        <svg width="14" height="10" viewBox="0 0 14 10" className="mt-0.5 text-[#c98a5a]">
          <path d="M2 0h10L11 8H3L2 0z" fill="currentColor" />
          <path d="M0 8h14v2H0z" fill="currentColor" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex w-9 shrink-0 items-start justify-center pt-2">
      <span className="text-sm font-bold text-[#1a1a1a]">{rank}</span>
    </div>
  );
}

export default function RankingProductCard({
  product,
  rank,
  href,
}: RankingProductCardProps) {
  const volumeText = product.volumeLabel ?? (product.volume ? `/${product.volume}` : "");

  return (
    <Link
      href={href}
      className="mx-3 mb-3 flex gap-2.5 rounded-2xl border border-[#f0f0f0] bg-white p-3 shadow-[0_2px_8px_rgba(0,0,0,0.05)] active:bg-[#fafafa]"
    >
      <RankBadge rank={rank} />

      <Image
        src={product.image}
        alt={product.name}
        width={88}
        height={88}
        className="h-[88px] w-[88px] shrink-0 object-contain"
      />

      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-[13px] font-semibold leading-snug text-[#1a1a1a]">
          {product.brand} {product.name}
        </p>

        <div className="mt-1.5 flex items-center gap-1 text-xs">
          <span className="text-[#f5a623]">★</span>
          <span className="font-semibold text-[#1a1a1a]">
            {formatRating(product.rating)}
          </span>
          <span className="text-[#aaa]">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        <div className="mt-1.5 flex flex-wrap items-baseline gap-1">
          {product.discountRate !== undefined && (
            <span className="text-sm font-bold text-[#ff6b00]">
              {product.discountRate}%
            </span>
          )}
          <span className="text-sm font-bold text-[#1a1a1a]">
            {formatPrice(product.price)}
          </span>
          {volumeText && (
            <span className="text-xs text-[#aaa]">{volumeText}</span>
          )}
        </div>

        {product.points !== undefined && (
          <div className="mt-1 flex items-center gap-1">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#ff6b00] text-[9px] font-bold text-white">
              P
            </span>
            <span className="text-xs font-medium text-[#ff6b00]">
              최대 {product.points.toLocaleString()}P
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
