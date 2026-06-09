"use client";

import { createPortal } from "react-dom";
import { useMobileFrame } from "@/hooks/use-mobile-frame";

type MobileFixedFooterProps = {
  children: React.ReactNode;
  className?: string;
  bottom?: number;
};

/**
 * data-mobile-frame 하단 고정 (390px 프레임 내부)
 */
export default function MobileFixedFooter({
  children,
  className = "",
  bottom = 0,
}: MobileFixedFooterProps) {
  const frame = useMobileFrame();

  if (!frame) return null;

  return createPortal(
    <div
      className={`fixed left-0 right-0 z-50 border-t border-[#eee] bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.06)] ${className}`}
      style={{
        bottom:
          bottom === 0
            ? "var(--safe-area-bottom)"
            : `calc(${bottom}px + var(--safe-area-bottom))`,
      }}
    >
      {children}
    </div>,
    frame,
  );
}
