export type Product = {
  id: string;
  brand: string;
  name: string;
  shortName?: string;
  image: string;
  detailImage?: string;
  price: number;
  originalPrice?: number;
  discountRate?: number;
  rating: number;
  reviewCount: number;
  mainCategory: string;
  subCategory: string;
  keywords: string[];
  ranking: number;
  cautionIngredients: number;
  allergyIngredients: number;
  oilySkin: string;
  drySkin: string;
  sensitiveSkin: string;
  functionalIngredients: string[];
  compatibilityScore: number;
  cautionIngredientList: string[];
  recommendationReasons: string[];
  inStock: boolean;
  freeShipping?: boolean;
  volume?: string;
  volumeDetail?: string;
  volumeLabel?: string;
  points?: number;
  award?: { year: number; categoryRank: string };
  awardDetails?: string[];
  sampleCount?: number;
};

export type CompareBox = {
  id: string;
  mainCategory: string;
  subCategory: string;
  productIds: string[];
  createdAt: number;
};

export type UserProfile = {
  skinType: string;
  skinConcerns: string[];
};

export type SkinFilter =
  | "전체"
  | "수분"
  | "진정"
  | "보습"
  | "모공"
  | "브라이트닝"
  | "안티에이징"
  | "트러블"
  | "각질";

export type RankingTab = "급상승" | "카테고리별" | "피부별" | "연령대별";

export type ToastMessage = {
  id: number;
  text: string;
  action?: { label: string; href: string };
};
