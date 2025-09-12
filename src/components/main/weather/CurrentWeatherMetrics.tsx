import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { getWeatherIcon } from "@/lib/api/weather";
import { Thermometer, Cloud, Droplet } from "lucide-react";
import { WeatherData, MetricCardProps } from "@/lib/types";

/* 날씨 정보 카드 컴포넌트 */
export default function CurrentWeatherMetrics({
  weatherData,
}: {
  weatherData: WeatherData;
}) {
  const { current, daily } = weatherData;

  // 날씨 데이터
  const weatherMetrics = useMemo(() => {
    return [
      {
        id: "current-temperature",
        icon: (
          <div className="weather-icon" role="img" aria-label="현재 날씨">
            {getWeatherIcon(current.weather_code)}
          </div>
        ),
        label: "현재 날씨",
        value: `${Math.round(current.temperature_2m)}°C`,
      },
      {
        id: "humidity",
        icon: (
          <div className="weather-icon" role="img" aria-label="습도">
            💧
          </div>
        ),
        label: "습도",
        value: `${current.relative_humidity_2m}%`,
      },
      {
        id: "wind-speed",
        icon: (
          <div className="weather-icon" role="img" aria-label="풍속">
            💨
          </div>
        ),
        label: "풍속",
        value: `${current.wind_speed_10m} km/h`,
      },
      {
        id: "temperature-range",
        icon: (
          <div className="weather-icon" role="img" aria-label="온도 범위">
            🌡️
          </div>
        ),
        label: "온도 범위",
        value: `${Math.round(daily.temperature_2m_min[0])}° / ${Math.round(
          daily.temperature_2m_max[0]
        )}°`,
      },
    ];
  }, [current, daily]);

  return (
    <div className="weather-cards-container">
      {weatherMetrics.map((metric) => (
        <MetricCard
          key={metric.id}
          icon={metric.icon}
          label={metric.label}
          value={metric.value}
        />
      ))}
    </div>
  );
}

// 카드 컴포넌트
const MetricCard = ({ icon, label, value }: MetricCardProps) => (
  <Card className="content-card text-center">
    {icon}
    <div className="weather-card-text ">{value}</div>
    <div className="card-title">{label}</div>
  </Card>
);
