"use client";

import { createPortal } from "react-dom";
import { useMobileFrame } from "@/hooks/use-mobile-frame";

type MobileAnchoredProps = {
  children: React.ReactNode;
  className?: string;
  top?: number;
  bottom?: number;
};

/**
 * data-mobile-frame 기준 fixed 앵커 (390px 프레임 오른쪽, overflow로 절반 잘림)
 */
export function MobileAnchoredRight({
  children,
  className = "",
  top,
  bottom = 100,
}: MobileAnchoredProps) {
  const frame = useMobileFrame();
  const positionStyle =
    top !== undefined ? { top: `${top}px` } : { bottom: `${bottom}px` };

  if (!frame) return null;

  return createPortal(
    <div
      className={`pointer-events-none fixed right-0 z-30 ${className}`}
      style={positionStyle}
    >
      <div className="pointer-events-auto translate-x-1/2 transition-transform duration-300 ease-in-out">
        {children}
      </div>
    </div>,
    frame,
  );
}
