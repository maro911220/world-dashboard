import { useMemo } from "react";
import { Country } from "@/lib/types";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

/* 국가 정보 컴포넌트 */
export default function CountryInfo({ country }: { country: Country }) {
  // 좌표를 포맷팅 (위도, 경도)
  const formattedCoordinates = useMemo(() => {
    const [latitude, longitude] = country.latlng;
    return {
      latitude: latitude.toFixed(2),
      longitude: longitude.toFixed(2),
    };
  }, [country.latlng]);

  return (
    <Card className="content-card">
      <CardHeader className="gap-0">
        <div className="country-card-header">
          <div className="country-card-header-info">
            <span className="country-flag">{country.flag}</span>
            <div>
              <CardTitle className="country-name">
                {country.name.common}
              </CardTitle>
              <p className="country-details">
                {country.capital?.[0]} • {country.region}
              </p>
            </div>
          </div>
          <div className="country-stats">
            <div className="country-population">
              인구 {(country.population / 1000000).toFixed(1)}M
            </div>
            <div>
              좌표 {formattedCoordinates.latitude}°,{" "}
              {formattedCoordinates.longitude}°
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
