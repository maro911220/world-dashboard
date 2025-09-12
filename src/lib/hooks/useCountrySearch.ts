import { Country } from "@/lib/types";
import { useState, useEffect } from "react";
import { useCountries } from "@/lib/hooks/useCountries";

// 값 변경을 지연시켜 불필요한 업데이트 방지
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// 검색 훅
export function useCountrySearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { searchForSuggestions } = useCountries();

  // 디바운싱된 검색어로 자동완성 목록 조회
  useEffect(() => {
    if (!debouncedSearchTerm) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const results = await searchForSuggestions(debouncedSearchTerm);
        setSuggestions(results);
      } catch (err) {
        setError("Country not found.");
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSearchTerm, searchForSuggestions]);

  return {
    searchTerm,
    setSearchTerm,
    suggestions,
    loading,
    error,
  };
}
