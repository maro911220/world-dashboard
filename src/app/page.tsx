"use client";
import "@/style/page.css";
import { Globe } from "lucide-react";
import { Country } from "@/lib/types";
import { useEffect, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  useInitialDashboardData,
  useWeather,
} from "@/lib/hooks/dashboardHooks";
import WeatherDetails from "@/components/main/WeatherDetails";
import CountriesSidebar from "@/components/main/CountriesSidebar";

/* 날씨 대시보드의 메인 컴포넌트 */
export default function CountriesWeatherDashboard() {
  // 초기 데이터 로딩
  const { countries, defaultCountry, isInitialLoading } =
    useInitialDashboardData();

  const {
    weatherData,
    selectedCountry,
    loading: weatherLoading,
    fetchWeather,
  } = useWeather();

  // 국가 선택 핸들러
  const handleCountrySelect = useCallback(
    (country: Country) => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      fetchWeather(country);
    },
    [fetchWeather]
  );

  // 전체 화면 로더 표시 조건
  const showFullScreenLoader = useMemo(() => {
    return isInitialLoading || (weatherLoading && !selectedCountry);
  }, [isInitialLoading, weatherLoading, selectedCountry]);

  // 콘텐츠 영역에 표시할 컴포넌트 결정
  const renderMainContent = useMemo(() => {
    if (weatherLoading && selectedCountry) {
      return <LoadingCard />;
    }
    if (selectedCountry && weatherData) {
      return (
        <WeatherDetails country={selectedCountry} weatherData={weatherData} />
      );
    }
    return <EmptyState />;
  }, [weatherLoading, selectedCountry, weatherData]);

  // 초기 설정
  useEffect(() => {
    if (defaultCountry && !selectedCountry) {
      fetchWeather(defaultCountry);
    }
  }, [defaultCountry, selectedCountry, fetchWeather]);

  return (
    <main className="content-wrapper" role="main">
      {showFullScreenLoader ? (
        <FullScreenLoader />
      ) : (
        <div className="main-layout">
          {/* 국가 목록 사이드바 */}
          <CountriesSidebar
            countries={countries}
            selectedCountry={selectedCountry}
            onSelectCountry={handleCountrySelect}
          />
          {/* 메인 콘텐츠 영역 */}
          <section className="content-pane" role="main">
            {renderMainContent}
          </section>
        </div>
      )}
    </main>
  );
}

// 컨텐츠 로딩  컴포넌트
const LoadingCard = () => (
  <Card className="placeholder-card">
    <CardContent>
      <div className="placeholder-content">
        <div className="loading-spinner"></div>
        <h3 className="placeholder-title">정보 로딩중...</h3>
      </div>
    </CardContent>
  </Card>
);

// 빈 상태 컴포넌트
const EmptyState = () => (
  <Card className="placeholder-card">
    <CardContent>
      <div className="placeholder-content">
        <Globe className="placeholder-globe-icon" />
        <h3 className="placeholder-title">국가를 선택하세요</h3>
        <p className="placeholder-description">
          사이드바에서 국가를 선택하면 해당 국가의 날씨 정보를 볼 수 있어요
        </p>
      </div>
    </CardContent>
  </Card>
);

// 초기 로딩 시 전체 로딩 컴포넌트
const FullScreenLoader = () => (
  <div
    role="status"
    aria-live="polite"
    aria-label="애플리케이션 로딩 중"
    className="initial-loading-overlay"
  >
    <div className="initial-loading-box flex-col">
      <p className="initial-loading-text">데이터를 불러오는 중...</p>
      <p className="initial-loading-subtext text-sm text-muted-foreground">
        국가 정보와 날씨 데이터를 준비하고 있습니다
      </p>
    </div>
  </div>
);
