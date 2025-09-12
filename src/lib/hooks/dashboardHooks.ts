import { useState, useEffect, useCallback } from "react";
import { useCountries } from "@/lib/hooks/useCountries";
import { Country, WeatherData } from "@/lib/types";
import { fetchWeatherDataForCountry } from "@/lib/api/weather";

/* 대시보드 초기 데이터 로딩 */
export const useInitialDashboardData = () => {
  const { countries, fetchPopular } = useCountries();
  const [defaultCountry, setDefaultCountry] = useState<Country | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const popularCountries = await fetchPopular();

      // 한국을 기본 국가로 설정, 없으면 첫 번째 국가 사용
      const foundCountry =
        popularCountries.find((c) => c?.name?.common === "South Korea") ||
        popularCountries[0];

      setDefaultCountry(foundCountry || null);
      setIsInitialLoading(false);
    };

    init();
  }, [fetchPopular]);

  return {
    countries,
    defaultCountry,
    isInitialLoading,
  };
};

/* 선택된 국가의 날씨 정보 관리 */
export const useWeather = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 선택된 국가의 날씨 정보 조회
  const fetchWeather = useCallback(async (country: Country) => {
    try {
      setLoading(true);
      setError(null);

      const weather = await fetchWeatherDataForCountry(country);
      setWeatherData(weather);
      setSelectedCountry(country);
    } catch (err) {
      setError("Failed to fetch weather data");
      setWeatherData(null);
      setSelectedCountry(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    selectedCountry,
    weatherData,
    loading,
    error,
    fetchWeather,
  };
};
