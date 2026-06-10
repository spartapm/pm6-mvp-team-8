import Image from "next/image";
import Link from "next/link";
import BottomNav from "@/components/layout/BottomNav";

const HOME_PRODUCT_LINKS = [
  {
    href: "/product/p1",
    label: "아쿠아 오아시스 토너",
    className: "absolute left-[1%] top-[27%] h-[17%] w-[49%]",
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col bg-white pb-nav">
      <div className="flex w-full flex-col">
        <Image
          src="/images/home/top.png"
          alt="화해 홈 상단"
          width={1170}
          height={1800}
          className="h-auto w-full max-w-full"
          sizes="(max-width: 390px) 100vw, 390px"
          priority
        />
        <div className="relative w-full">
          <Image
            src="/images/home/bottom.png"
            alt="화해 홈 카테고리별 판매 BEST"
            width={1170}
            height={2400}
            className="h-auto w-full max-w-full"
            sizes="(max-width: 390px) 100vw, 390px"
          />
          {HOME_PRODUCT_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.label}
              className={`${link.className} z-10`}
            />
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
