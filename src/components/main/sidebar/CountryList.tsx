import { cn } from "@/lib/utils";
import { MapPin, Users } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Country,
  CountryListItemProps,
  CountriesSidebarProps,
} from "@/lib/types";

/* 국가 목록을 표시하는 메인 컴포넌트 */
export default function CountryList({
  countries,
  selectedCountry,
  onSelectCountry,
}: CountriesSidebarProps) {
  return (
    <ScrollArea className="country-list-container">
      {countries.map((country: Country) => {
        const isSelected = selectedCountry?.name.common === country.name.common;
        return (
          <CountryListItem
            key={country.name.common}
            country={country}
            isSelected={isSelected}
            onSelectCountry={onSelectCountry}
          />
        );
      })}
    </ScrollArea>
  );
}

// 목록 아이템 컴포넌트
const CountryListItem = ({
  country,
  isSelected,
  onSelectCountry,
}: CountryListItemProps) => {
  // 인구 수 포맷팅 함수
  const formatPopulation = (population: number): string => {
    return (population / 1000000).toFixed(1);
  };

  // 엔터 함수
  const onItemKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelectCountry(country);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => onItemKeyDown(e)}
      onClick={() => onSelectCountry(country)}
      className={cn("country-list-item", { selected: isSelected })}
    >
      <div className="country-item-content">
        <span
          className="country-item-flag"
          aria-label={`${country.name.common} 국기`}
        >
          {country.flag}
        </span>
        <div className="country-item-info">
          <div className="country-item-name">{country.name.common}</div>
          <div className="country-item-capital">
            <MapPin className="country-item-icon" aria-hidden="true" />
            {country.capital?.[0] || "정보 없음"}
          </div>
          <div className="country-item-details">
            <Users className="country-item-icon" aria-hidden="true" />
            {formatPopulation(country.population)}M • {country.region}
          </div>
        </div>
      </div>
    </div>
  );
};
