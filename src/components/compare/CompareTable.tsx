import Image from "next/image";
import Link from "next/link";
import { COMPARE_TABLE_ROWS } from "@/lib/recommendation";
import { formatRating } from "@/lib/mock-products";
import type { Product } from "@/lib/types";

type CompareTableProps = {
  products: Product[];
};

function skinBarValues(value: string) {
  const normalized = value.replace(/\s/g, "");
  if (normalized.includes("매우적합")) return { good: 2, bad: 0 };
  if (normalized.includes("적합")) return { good: 1, bad: 0 };
  if (normalized.includes("부적합")) return { good: 0, bad: 1 };
  return { good: 1, bad: 0 };
}

function SkinBar({ value }: { value: string }) {
  const { good, bad } = skinBarValues(value);

  return (
    <div className="flex items-center justify-center gap-1">
      <span className="flex h-5 min-w-[28px] items-center justify-center rounded-sm bg-[#48c7cf] px-1.5 text-[11px] font-semibold text-white">
        {good}
      </span>
      <span className="flex h-5 min-w-[28px] items-center justify-center rounded-sm bg-[#f08080] px-1.5 text-[11px] font-semibold text-white">
        {bad}
      </span>
    </div>
  );
}

function CompareCell({
  product,
  rowKey,
}: {
  product: Product;
  rowKey: (typeof COMPARE_TABLE_ROWS)[number]["key"];
}) {
  switch (rowKey) {
    case "rating":
      return (
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-0.5">
            <span className="text-[#f5a623]">★</span>
            <span className="text-sm font-semibold text-[#1a1a1a]">
              {formatRating(product.rating)}
            </span>
          </div>
          <span className="text-[10px] text-[#aaa]">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>
      );
    case "price":
      return (
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-baseline gap-1">
            {product.discountRate !== undefined && (
              <span className="text-sm font-bold text-[#48c7cf]">
                {product.discountRate}%
              </span>
            )}
            <span className="text-sm font-bold text-[#1a1a1a]">
              {product.price.toLocaleString()}
            </span>
          </div>
          {product.volume && (
            <span className="text-[10px] text-[#aaa]">{product.volume}</span>
          )}
        </div>
      );
    case "keywords":
      return (
        <div className="space-y-0.5 text-center text-[11px] leading-snug text-[#666]">
          {product.keywords.length > 0 ? (
            product.keywords.slice(0, 2).map((keyword) => (
              <p key={keyword}>#{keyword}</p>
            ))
          ) : (
            <>
              <p># / #</p>
              <p># / #</p>
            </>
          )}
        </div>
      );
    case "ranking":
      return (
        <div className="text-center text-[11px] leading-snug">
          <p className="text-[#666]">{product.subCategory}</p>
          <p className="font-bold text-[#48c7cf]">{product.ranking}위</p>
        </div>
      );
    case "cautionIngredients":
    case "allergyIngredients":
      return (
        <span className="text-sm font-medium text-[#1a1a1a]">
          {rowKey === "cautionIngredients"
            ? product.cautionIngredients
            : product.allergyIngredients}
        </span>
      );
    case "oilySkin":
    case "drySkin":
    case "sensitiveSkin":
      return (
        <SkinBar
          value={
            rowKey === "oilySkin"
              ? product.oilySkin
              : rowKey === "drySkin"
                ? product.drySkin
                : product.sensitiveSkin
          }
        />
      );
    case "functionalIngredients":
      return (
        <div className="space-y-0.5 text-center text-[11px] leading-snug text-[#666]">
          {product.functionalIngredients.slice(0, 2).map((item) => (
            <p key={item}>#{item}</p>
          ))}
        </div>
      );
    default:
      return <span className="text-[#666]">-</span>;
  }
}

export default function CompareTable({ products }: CompareTableProps) {
  const colWidth = `calc((100% - 72px) / ${products.length})`;

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[320px] border-collapse text-xs">
        <tbody>
          {COMPARE_TABLE_ROWS.map((row) => (
            <tr key={row.key} className="border-t border-[#eee]">
              <td className="sticky left-0 z-10 w-[72px] bg-[#f7f7f7] px-2 py-3 text-[11px] font-medium leading-snug text-[#888]">
                {row.label}
              </td>
              {products.map((product, index) => (
                <td
                  key={product.id}
                  style={{ width: colWidth }}
                  className={`px-2 py-3 text-center ${
                    index < products.length - 1 ? "border-r border-[#eee]" : ""
                  }`}
                >
                  <CompareCell product={product} rowKey={row.key} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CompareProductHeader({ products }: { products: Product[] }) {
  return (
    <div
      className="grid items-stretch border-b border-[#eee]"
      style={{ gridTemplateColumns: `72px repeat(${products.length}, 1fr)` }}
    >
      <div className="bg-[#f7f7f7]" />
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`flex h-full flex-col px-2 py-4 ${
            index < products.length - 1 ? "border-r border-[#eee]" : ""
          }`}
        >
          <div className="relative mx-auto h-[88px] w-full max-w-[100px] shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              sizes="100px"
            />
          </div>

          <div className="mt-2 flex flex-1 flex-col">
            <p className="h-3.5 w-full shrink-0 truncate text-center text-[10px] leading-[14px] text-[#aaa]">
              [{product.brand}]
            </p>
            <p className="mt-0.5 line-clamp-2 h-9 w-full shrink-0 text-center text-[12px] font-semibold leading-[18px] text-[#1a1a1a]">
              {product.shortName ?? product.name}
            </p>
            <div className="flex-1" aria-hidden />
            <Link
              href={`/product/${product.id}`}
              className="mt-2 w-full shrink-0 rounded-md bg-[#48c7cf] py-2 text-center text-[11px] font-bold text-white"
            >
              구매하기
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
