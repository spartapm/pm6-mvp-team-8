import type { Product } from "./types";

export function getRecommendedProduct(products: Product[]): Product | null {
  if (products.length === 0) return null;

  const sorted = [...products].sort((a, b) => {
    if (b.compatibilityScore !== a.compatibilityScore) {
      return b.compatibilityScore - a.compatibilityScore;
    }
    if (a.ranking !== b.ranking) {
      return a.ranking - b.ranking;
    }
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    if (a.inStock !== b.inStock) {
      return a.inStock ? -1 : 1;
    }
    return 0;
  });

  return sorted[0] ?? null;
}

export const COMPARE_TABLE_ROWS = [
  { key: "rating", label: "평점" },
  { key: "price", label: "가격" },
  { key: "keywords", label: "주요키워드" },
  { key: "ranking", label: "랭킹" },
  { key: "cautionIngredients", label: "20가지 주의성분" },
  { key: "allergyIngredients", label: "알레르기 유발 주의성분" },
  { key: "oilySkin", label: "지성피부" },
  { key: "drySkin", label: "건성피부" },
  { key: "sensitiveSkin", label: "민감성피부" },
  { key: "functionalIngredients", label: "기능성성분" },
] as const;

export function getCompareCellValue(
  product: Product,
  key: (typeof COMPARE_TABLE_ROWS)[number]["key"],
): string {
  switch (key) {
    case "rating":
      return `${product.rating.toFixed(2)} (${product.reviewCount.toLocaleString()})`;
    case "price":
      return `${product.price.toLocaleString()}원`;
    case "keywords":
      return product.keywords.join(", ") || "정보 없음";
    case "ranking":
      return `${product.ranking}위`;
    case "cautionIngredients":
      return `${product.cautionIngredients}개`;
    case "allergyIngredients":
      return `${product.allergyIngredients}개`;
    case "oilySkin":
      return product.oilySkin;
    case "drySkin":
      return product.drySkin;
    case "sensitiveSkin":
      return product.sensitiveSkin;
    case "functionalIngredients":
      return product.functionalIngredients.join(", ") || "정보 없음";
    default:
      return "정보 없음";
  }
}
