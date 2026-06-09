"use client";

import Image from "next/image";

type CompareTooltipProps = {
  visible: boolean;
  onClose: () => void;
};

export default function CompareTooltip({
  visible,
  onClose,
}: CompareTooltipProps) {
  if (!visible) return null;

  return (
    <div className="absolute bottom-full left-0 z-10 mb-2 w-[200px]">
      <div className="relative">
        <Image
          src="/images/compare-tooltip.png"
          alt=""
          width={200}
          height={56}
          className="h-auto w-[200px]"
          aria-hidden
        />
        <p className="absolute left-4 top-3 text-xs font-medium text-white">
          비교함에 담아보세요
        </p>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-2.5 flex h-5 w-5 items-center justify-center text-white/80"
          aria-label="닫기"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
