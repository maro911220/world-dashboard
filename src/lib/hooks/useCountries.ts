import { useState, useCallback } from "react";
import { Country } from "@/lib/types";
import {
  fetchCountriesByNames,
  searchCountries as searchCountriesApi,
  POPULAR_COUNTRIES,
} from "@/lib/api/countries";

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 로딩/에러 상태를 관리하며 API 호출
  const executeWithLoading = async <T>(
    operation: () => Promise<T>,
    errorMessage: string
  ): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      return await operation();
    } catch (err) {
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 인기 국가 목록 조회
  const fetchPopular = useCallback(async () => {
    const result = await executeWithLoading(
      () => fetchCountriesByNames(Array.from(POPULAR_COUNTRIES)),
      "Failed to fetch countries data"
    );

    const countries = result || [];
    setCountries(countries);
    return countries;
  }, []);

  // 국가명으로 검색
  const search = useCallback(async (term: string) => {
    if (!term.trim()) return;

    const result = await executeWithLoading(
      () => searchCountriesApi(term),
      "Country not found. Please try a different name."
    );

    setCountries(result || []);
  }, []);

  // 자동완성용 검색 (상태 변경 안함)
  const searchForSuggestions = useCallback(
    async (term: string): Promise<Country[]> => {
      if (!term.trim()) return [];

      try {
        return await searchCountriesApi(term);
      } catch {
        return [];
      }
    },
    []
  );

  return {
    countries,
    loading,
    error,
    search,
    fetchPopular,
    setCountries,
    searchForSuggestions,
  };
}
