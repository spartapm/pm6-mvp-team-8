import Image from "next/image";
import BottomNav from "@/components/layout/BottomNav";

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
        <Image
          src="/images/home/bottom.png"
          alt="화해 홈 카테고리별 판매 BEST"
          width={1170}
          height={2400}
          className="h-auto w-full max-w-full"
          sizes="(max-width: 390px) 100vw, 390px"
        />
      </div>
      <BottomNav />
    </div>
  );
}
