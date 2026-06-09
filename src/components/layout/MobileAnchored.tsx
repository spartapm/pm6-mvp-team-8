type MobileAnchoredProps = {
  children: React.ReactNode;
  className?: string;
  collapsed?: boolean;
  top?: number;
  bottom?: number;
};

/**
 * data-mobile-frame 기준 fixed 앵커 (390px 프레임 오른쪽, overflow로 절반 잘림)
 */
export function MobileAnchoredRight({
  children,
  className = "",
  collapsed = false,
  top,
  bottom = 100,
}: MobileAnchoredProps) {
  const positionStyle =
    top !== undefined ? { top: `${top}px` } : { bottom: `${bottom}px` };

  return (
    <div
      className={`pointer-events-none fixed right-0 z-30 ${className}`}
      style={positionStyle}
    >
      <div
        className={`pointer-events-auto transition-transform duration-300 ease-in-out ${
          collapsed ? "translate-x-[82%]" : "translate-x-1/2"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
