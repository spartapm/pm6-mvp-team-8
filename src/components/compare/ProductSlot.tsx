"use client";

import Image from "next/image";
import { formatPrice, formatRating } from "@/lib/mock-products";
import type { Product } from "@/lib/types";

type ProductSlotProps = {
  product?: Product;
  selected?: boolean;
  onToggle?: () => void;
  onAdd?: () => void;
  isAddSlot?: boolean;
};

function SelectionIndicator({ selected }: { selected: boolean }) {
  return (
    <span
      className={`absolute right-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full ${
        selected
          ? "bg-[#48c7cf]"
          : "border-2 border-[#ddd] bg-white"
      }`}
    >
      {selected && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12l5 5L20 7"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

export default function ProductSlot({
  product,
  selected = false,
  onToggle,
  onAdd,
  isAddSlot = false,
}: ProductSlotProps) {
  if (isAddSlot) {
    return (
      <button
        type="button"
        onClick={onAdd}
        className="flex min-h-[196px] flex-col items-center justify-center rounded-lg border border-dashed border-[#ddd] bg-white transition-colors active:border-[#48c7cf]"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 5v14M5 12h14"
            stroke="#ccc"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    );
  }

  if (!product) return null;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative flex min-h-[196px] flex-col overflow-hidden rounded-lg border-2 bg-white text-left transition-colors ${
        selected
          ? "border-solid border-[#48c7cf]"
          : "border-dashed border-[#ddd]"
      }`}
    >
      <SelectionIndicator selected={selected} />

      <div className="relative mx-auto mt-2 aspect-square w-[78%]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain"
          sizes="160px"
        />
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2.5 pt-1.5">
        <p className="text-[10px] text-[#aaa]">[{product.brand}]</p>
        <p className="mt-0.5 line-clamp-2 min-h-[2.5rem] text-[12px] font-semibold leading-5 text-[#1a1a1a]">
          {product.shortName ?? product.name}
        </p>

        <div className="mt-1 flex items-center gap-0.5 text-[10px] text-[#aaa]">
          <span className="text-[#f5a623]">★</span>
          <span>{formatRating(product.rating)}</span>
        </div>

        <div className="mt-auto flex items-baseline justify-between gap-1 pt-1.5">
          {product.discountRate !== undefined && (
            <span className="text-[12px] font-bold text-[#48c7cf]">
              {product.discountRate}%
            </span>
          )}
          <span className="text-[12px] font-bold text-[#1a1a1a]">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </button>
  );
}
