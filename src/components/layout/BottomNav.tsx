"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useMobileFrame } from "@/hooks/use-mobile-frame";

const NAV_ITEMS = [
  { href: "/", label: "홈", icon: HomeIcon, disabled: false },
  { href: "/category", label: "카테고리", icon: GridIcon, disabled: true },
  { href: "/benefits", label: "혜택", icon: GiftIcon, disabled: true },
  { href: "/shop", label: "쇼핑", icon: BagIcon, disabled: true },
  { href: "/compare", label: "비교함", icon: CompareIcon, disabled: false },
  { href: "/my", label: "마이", icon: UserIcon, disabled: true },
] as const;

export default function BottomNav() {
  const pathname = usePathname();
  const frame = useMobileFrame();

  if (!frame) return null;

  return createPortal(
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#eee] bg-white pb-[env(safe-area-inset-bottom)]">
      <div className="flex h-14 items-stretch">
        {NAV_ITEMS.map(({ href, label, icon: Icon, disabled }) => {
          const active =
            !disabled &&
            (href === "/compare"
              ? pathname.startsWith("/compare")
              : pathname === href);

          const className = `flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] ${
            active ? "font-semibold text-[#1a1a1a]" : "text-[#999]"
          }`;

          if (disabled) {
            return (
              <span
                key={href}
                aria-disabled="true"
                className={`${className} cursor-not-allowed opacity-60`}
              >
                <Icon active={false} />
                <span>{label}</span>
              </span>
            );
          }

          return (
            <Link key={href} href={href} className={className}>
              <Icon active={active} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>,
    frame,
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z"
        stroke={active ? "#1a1a1a" : "#999"}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GridIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="1.5" stroke={active ? "#1a1a1a" : "#999"} strokeWidth="1.8" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" stroke={active ? "#1a1a1a" : "#999"} strokeWidth="1.8" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" stroke={active ? "#1a1a1a" : "#999"} strokeWidth="1.8" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" stroke={active ? "#1a1a1a" : "#999"} strokeWidth="1.8" />
    </svg>
  );
}

function GiftIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="10" width="18" height="11" rx="1.5" stroke={active ? "#1a1a1a" : "#999"} strokeWidth="1.8" />
      <path d="M12 10V21M3 14h18" stroke={active ? "#1a1a1a" : "#999"} strokeWidth="1.8" />
      <path d="M12 10c-2-3-5-3-5 0s3 2 5 0 5-3 5 0-3 3-5 0" stroke={active ? "#1a1a1a" : "#999"} strokeWidth="1.8" />
    </svg>
  );
}

function BagIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M6 8h12l-1 13H7L6 8z" stroke={active ? "#1a1a1a" : "#999"} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 016 0v2" stroke={active ? "#1a1a1a" : "#999"} strokeWidth="1.8" />
    </svg>
  );
}

function CompareIcon({ active }: { active: boolean }) {
  const color = active ? "#1a1a1a" : "#999";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 6v12M16 18V6"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M5 9l3-3 3 3M19 15l-3 3-3-3"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={active ? "#1a1a1a" : "#999"} strokeWidth="1.8" />
      <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" stroke={active ? "#1a1a1a" : "#999"} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
