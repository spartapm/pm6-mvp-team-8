"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { MAIN_CATEGORIES, SUB_CATEGORIES } from "@/lib/categories";
import type { MainCategory } from "@/lib/categories";
import { useMobileFrame } from "@/hooks/use-mobile-frame";

const ENABLED_MAIN: MainCategory = "스킨케어";
const ENABLED_SUB = "스킨/토너";

type CategoryBottomSheetProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (mainCategory: string, subCategory: string) => void;
};

export default function CategoryBottomSheet({
  open,
  onClose,
  onSelect,
}: CategoryBottomSheetProps) {
  const [selectedMain, setSelectedMain] = useState<MainCategory | null>(null);
  const frame = useMobileFrame();

  if (!open || !frame) return null;

  const handleSubSelect = (main: MainCategory, sub: string) => {
    onSelect(main, sub);
    setSelectedMain(null);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="닫기"
      />
      <div className="relative z-10 max-h-[80dvh] w-full overflow-hidden rounded-t-2xl bg-white pb-[var(--safe-area-bottom)]">
        <div className="flex items-center justify-between border-b border-[#eee] px-4 py-3">
          <h2 className="text-base font-bold">카테고리 선택</h2>
          <button type="button" onClick={onClose} className="text-[#999]">
            ✕
          </button>
        </div>

        <div className="flex max-h-[calc(80dvh-52px)]">
          <div className="w-2/5 overflow-y-auto border-r border-[#eee] bg-[#fafafa]">
            {MAIN_CATEGORIES.map((main) => {
              const enabled = main === ENABLED_MAIN;

              return (
                <button
                  key={main}
                  type="button"
                  disabled={!enabled}
                  onClick={() => enabled && setSelectedMain(main)}
                  className={`block w-full px-4 py-3 text-left text-sm ${
                    !enabled
                      ? "cursor-not-allowed text-[#ccc]"
                      : selectedMain === main
                        ? "bg-white font-semibold text-[#00b9a6]"
                        : "text-[#333]"
                  }`}
                >
                  {main}
                </button>
              );
            })}
          </div>
          <div className="flex-1 overflow-y-auto">
            {selectedMain ? (
              SUB_CATEGORIES[selectedMain].map((sub) => {
                const enabled =
                  selectedMain === ENABLED_MAIN && sub === ENABLED_SUB;

                return (
                  <button
                    key={sub}
                    type="button"
                    disabled={!enabled}
                    onClick={() =>
                      enabled && handleSubSelect(selectedMain, sub)
                    }
                    className={`block w-full border-b border-[#f5f5f5] px-4 py-3 text-left text-sm ${
                      enabled
                        ? "text-[#333] active:bg-[#f9f9f9]"
                        : "cursor-not-allowed text-[#ccc]"
                    }`}
                  >
                    {sub}
                  </button>
                );
              })
            ) : (
              <p className="px-4 py-8 text-center text-sm text-[#999]">
                대분류를 선택해주세요
              </p>
            )}
          </div>
        </div>
      </div>
    </div>,
    frame,
  );
}
