// src/hooks/useLocalStorage.js
import { useEffect, useState } from "react";

/**
 * Hook đồng bộ state với localStorage.
 * - Đọc từ localStorage khi mount.
 * - Ghi vào localStorage khi value thay đổi.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // bỏ qua khi quota full
    }
  }, [key, value]);

  return [value, setValue];
}
