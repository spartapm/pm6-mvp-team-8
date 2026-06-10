"use client";

type CompatibilityScoreBadgeProps = {
  score: number;
  collapsed?: boolean;
  onExpand?: () => void;
  className?: string;
};

export default function CompatibilityScoreBadge({
  score,
  collapsed = false,
  onExpand,
  className = "",
}: CompatibilityScoreBadgeProps) {
  return (
    <button
      type="button"
      onClick={collapsed ? onExpand : undefined}
      aria-disabled={collapsed ? undefined : true}
      className={`relative overflow-hidden bg-[#5d5f97] shadow-md transition-all duration-300 ease-in-out ${className} ${
        collapsed ? "cursor-pointer" : "cursor-not-allowed"
      } ${
        collapsed
          ? "h-[96px] w-[40px] rounded-l-[20px] rounded-r-none"
          : "h-[108px] w-[110px] rounded-[28px]"
      }`}
      aria-label={`궁합 점수 ${score}점`}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-200 ${
          collapsed ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute left-[15px] top-[16px] h-6 w-6 rounded-full bg-[#c5c7dc]" />
        <span className="absolute left-[8px] top-[46px] whitespace-nowrap text-[10px] leading-tight text-white">
          궁합 점수
        </span>
        <span className="absolute left-[8px] top-[62px] flex items-center gap-0.5 whitespace-nowrap text-[13px] font-bold leading-none text-white">
          {score}점
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <div
        className={`absolute inset-0 transition-opacity duration-200 ${
          collapsed ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute left-[5px] top-1/2 -translate-y-1/2">
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path d="M9 1.5L2.5 6 9 10.5V1.5z" fill="white" />
          </svg>
        </div>
      </div>
    </button>
  );
}
