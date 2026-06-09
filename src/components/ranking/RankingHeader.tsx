import Link from "next/link";

type RankingHeaderProps = {
  backHref: string;
};

export default function RankingHeader({ backHref }: RankingHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#f0f0f0] bg-white">
      <div className="flex h-12 items-center justify-between px-3">
        <Link
          href={backHref}
          className="flex h-8 w-8 items-center justify-center"
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
        </Link>
        <h1 className="text-base font-bold text-[#1a1a1a]">랭킹</h1>
        <div className="flex items-center gap-0.5">
          <Link
            href="/search"
            className="flex h-8 w-8 items-center justify-center"
            aria-label="검색"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#1a1a1a" strokeWidth="2" />
              <path
                d="M20 20l-3-3"
                stroke="#1a1a1a"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Link>
          <Link
            href="/cart"
            className="relative flex h-8 w-8 items-center justify-center"
            aria-label="장바구니"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 8h12l-1 13H7L6 8z"
                stroke="#1a1a1a"
                strokeWidth="1.8"
              />
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
