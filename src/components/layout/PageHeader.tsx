"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type PageHeaderProps = {
  title: string;
  backHref?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  centered?: boolean;
  subtitle?: string;
};

export default function PageHeader({
  title,
  backHref,
  onBack,
  right,
  centered = false,
  subtitle,
}: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    if (backHref) {
      router.push(backHref);
      return;
    }
    router.back();
  };

  if (centered) {
    return (
      <header className="sticky top-0 z-30 bg-white">
        <div className="relative flex h-12 items-center justify-center px-3">
          {(backHref || onBack) && (
            <button
              type="button"
              onClick={handleBack}
              className="absolute left-3 flex h-8 w-8 items-center justify-center"
              aria-label="뒤로가기"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="#1a1a1a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          <h1 className="text-base font-bold text-[#1a1a1a]">{title}</h1>
          {right && <div className="absolute right-3 shrink-0">{right}</div>}
        </div>
        {subtitle && (
          <p className="pb-3 text-center text-sm text-[#aaa]">{subtitle}</p>
        )}
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 flex h-12 items-center justify-between border-b border-[#f0f0f0] bg-white px-3">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {(backHref || onBack) && (
          <button
            type="button"
            onClick={handleBack}
            className="flex h-8 w-8 shrink-0 items-center justify-center"
            aria-label="뒤로가기"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 6l-6 6 6 6"
                stroke="#1a1a1a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <h1 className="truncate text-base font-bold text-[#1a1a1a]">{title}</h1>
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </header>
  );
}

export function RankingHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#f0f0f0] bg-white">
      <div className="flex h-12 items-center justify-between px-3">
        <Link href="/compare" className="flex h-8 w-8 items-center justify-center" aria-label="뒤로가기">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 6l-6 6 6 6" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <h1 className="text-base font-bold">랭킹</h1>
        <div className="flex items-center gap-1">
          <Link href="/search" className="flex h-8 w-8 items-center justify-center" aria-label="검색">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#1a1a1a" strokeWidth="2" />
              <path d="M20 20l-3-3" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Link>
          <Link href="/cart" className="relative flex h-8 w-8 items-center justify-center" aria-label="장바구니">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 8h12l-1 13H7L6 8z" stroke="#1a1a1a" strokeWidth="1.8" />
              <path d="M9 8V6a3 3 0 016 0v2" stroke="#1a1a1a" strokeWidth="1.8" />
            </svg>
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#00b9a6] px-1 text-[10px] font-bold text-white">
              2
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export function ProductDetailHeader() {
  return (
    <header className="absolute top-0 z-20 flex w-full items-center justify-between px-3 pt-2">
      <button
        type="button"
        onClick={() => history.back()}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow"
        aria-label="뒤로가기"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M15 6l-6 6 6 6" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <div className="flex items-center gap-1">
        <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow" aria-label="홈">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" stroke="#1a1a1a" strokeWidth="1.8" />
          </svg>
        </Link>
        <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow" aria-label="공유">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 3v10M8 7l4-4 4 4M5 14v5a2 2 0 002 2h10a2 2 0 002-2v-5" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <Link href="/search" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow" aria-label="검색">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#1a1a1a" strokeWidth="1.8" />
            <path d="M20 20l-3-3" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </Link>
        <Link href="/cart" className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow" aria-label="장바구니">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 8h12l-1 13H7L6 8z" stroke="#1a1a1a" strokeWidth="1.8" />
            <path d="M9 8V6a3 3 0 016 0v2" stroke="#1a1a1a" strokeWidth="1.8" />
          </svg>
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#00b9a6] px-1 text-[10px] font-bold text-white">
            2
          </span>
        </Link>
      </div>
    </header>
  );
}
