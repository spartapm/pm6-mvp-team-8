"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useCompare } from "@/lib/compare-store";
import { useMobileFrame } from "@/hooks/use-mobile-frame";

export default function ToastContainer() {
  const { toasts, dismissToast } = useCompare();
  const frame = useMobileFrame();

  if (toasts.length === 0 || !frame) return null;

  return createPortal(
    <div
      className="pointer-events-none fixed inset-x-0 z-50 flex flex-col gap-2 px-4"
      style={{ bottom: "calc(5rem + var(--safe-area-bottom))" }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 rounded-xl bg-[#333]/95 px-4 py-3 text-sm text-white shadow-lg"
        >
          <p className="flex-1">{toast.text}</p>
          {toast.action ? (
            <Link
              href={toast.action.href}
              className="shrink-0 font-semibold text-[#7ee8dc]"
              onClick={() => dismissToast(toast.id)}
            >
              {toast.action.label}
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="shrink-0 text-white/70"
              aria-label="닫기"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>,
    frame,
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm text-[#666]">
        일시적으로 정보를 불러오지 못했어요.
        <br />
        다시 시도해 주세요.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-lg bg-[#00b9a6] px-6 py-2.5 text-sm font-semibold text-white"
      >
        다시 시도
      </button>
    </div>
  );
}
