"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CompareBox, ToastMessage } from "./types";

const STORAGE_KEY = "group8-compare-boxes";
const STORAGE_VERSION_KEY = "group8-compare-version";
const STORAGE_VERSION = "3";

type CompareContextValue = {
  boxes: CompareBox[];
  isLoading: boolean;
  hasError: boolean;
  toasts: ToastMessage[];
  retryLoad: () => void;
  createBox: (mainCategory: string, subCategory: string) => CompareBox;
  findBoxByCategory: (
    mainCategory: string,
    subCategory: string,
  ) => CompareBox | undefined;
  addProductToBox: (boxId: string, productId: string) => boolean;
  removeProductFromBox: (boxId: string, productId: string) => void;
  toggleProductInCategory: (
    mainCategory: string,
    subCategory: string,
    productId: string,
  ) => { added: boolean; boxId: string };
  isProductInAnyBox: (productId: string) => boolean;
  isProductInCategoryBox: (
    productId: string,
    mainCategory: string,
    subCategory: string,
  ) => boolean;
  showToast: (text: string, action?: ToastMessage["action"]) => void;
  dismissToast: (id: number) => void;
};

const CompareContext = createContext<CompareContextValue | null>(null);

function loadBoxes(): CompareBox[] {
  if (typeof window === "undefined") return [];
  try {
    const version = localStorage.getItem(STORAGE_VERSION_KEY);
    if (version !== STORAGE_VERSION) {
      localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    return JSON.parse(raw) as CompareBox[];
  } catch {
    return [];
  }
}

function saveBoxes(boxes: CompareBox[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(boxes));
}

function createId() {
  return `box-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [boxes, setBoxes] = useState<CompareBox[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const load = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    try {
      setBoxes(loadBoxes());
    } catch {
      setHasError(true);
    } finally {
      setTimeout(() => setIsLoading(false), 300);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!isLoading && !hasError) {
      saveBoxes(boxes);
    }
  }, [boxes, isLoading, hasError]);

  const showToast = useCallback(
    (text: string, action?: ToastMessage["action"]) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, text, action }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    [],
  );

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const createBox = useCallback(
    (mainCategory: string, subCategory: string): CompareBox => {
      const newBox: CompareBox = {
        id: createId(),
        mainCategory,
        subCategory,
        productIds: [],
        createdAt: Date.now(),
      };
      setBoxes((prev) => [newBox, ...prev]);
      return newBox;
    },
    [],
  );

  const findBoxByCategory = useCallback(
    (mainCategory: string, subCategory: string) =>
      boxes.find(
        (b) =>
          b.mainCategory === mainCategory && b.subCategory === subCategory,
      ),
    [boxes],
  );

  const addProductToBox = useCallback(
    (boxId: string, productId: string): boolean => {
      const box = boxes.find((b) => b.id === boxId);
      if (!box) return false;
      if (box.productIds.includes(productId)) return false;
      if (box.productIds.length >= 3) return false;

      setBoxes((prev) =>
        prev.map((b) =>
          b.id === boxId
            ? { ...b, productIds: [...b.productIds, productId] }
            : b,
        ),
      );
      return true;
    },
    [boxes],
  );

  const removeProductFromBox = useCallback(
    (boxId: string, productId: string) => {
      setBoxes((prev) =>
        prev.map((b) =>
          b.id === boxId
            ? {
                ...b,
                productIds: b.productIds.filter((id) => id !== productId),
              }
            : b,
        ),
      );
    },
    [],
  );

  const toggleProductInCategory = useCallback(
    (
      mainCategory: string,
      subCategory: string,
      productId: string,
    ): { added: boolean; boxId: string } => {
      let targetBox = boxes.find(
        (b) =>
          b.mainCategory === mainCategory && b.subCategory === subCategory,
      );

      if (!targetBox) {
        targetBox = {
          id: createId(),
          mainCategory,
          subCategory,
          productIds: [],
          createdAt: Date.now(),
        };
        setBoxes((prev) => [targetBox!, ...prev]);
      }

      const isInBox = targetBox.productIds.includes(productId);
      if (isInBox) {
        setBoxes((prev) =>
          prev.map((b) =>
            b.id === targetBox!.id
              ? {
                  ...b,
                  productIds: b.productIds.filter((id) => id !== productId),
                }
              : b,
          ),
        );
        return { added: false, boxId: targetBox.id };
      }

      if (targetBox.productIds.length >= 3) {
        showToast("최대 3개까지 비교할 수 있어요.");
        return { added: false, boxId: targetBox.id };
      }

      setBoxes((prev) =>
        prev.map((b) =>
          b.id === targetBox!.id
            ? { ...b, productIds: [...b.productIds, productId] }
            : b,
        ),
      );
      return { added: true, boxId: targetBox.id };
    },
    [boxes, showToast],
  );

  const isProductInAnyBox = useCallback(
    (productId: string) =>
      boxes.some((b) => b.productIds.includes(productId)),
    [boxes],
  );

  const isProductInCategoryBox = useCallback(
    (productId: string, mainCategory: string, subCategory: string) => {
      const box = boxes.find(
        (b) =>
          b.mainCategory === mainCategory && b.subCategory === subCategory,
      );
      return box?.productIds.includes(productId) ?? false;
    },
    [boxes],
  );

  const value = useMemo(
    () => ({
      boxes,
      isLoading,
      hasError,
      toasts,
      retryLoad: load,
      createBox,
      findBoxByCategory,
      addProductToBox,
      removeProductFromBox,
      toggleProductInCategory,
      isProductInAnyBox,
      isProductInCategoryBox,
      showToast,
      dismissToast,
    }),
    [
      boxes,
      isLoading,
      hasError,
      toasts,
      load,
      createBox,
      findBoxByCategory,
      addProductToBox,
      removeProductFromBox,
      toggleProductInCategory,
      isProductInAnyBox,
      isProductInCategoryBox,
      showToast,
      dismissToast,
    ],
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) {
    throw new Error("useCompare must be used within CompareProvider");
  }
  return ctx;
}
