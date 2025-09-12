import { Country, WeatherData, ChartData } from "../types";

/* 날씨 코드를 기반으로 적절한 이모지 아이콘을 반환하는 함수 */
export const getWeatherIcon = (code: number): string => {
  if (code <= 3) return "☀️";
  if (code <= 48) return "☁️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 99) return "⛈️";
  return "❓";
};

/* 날씨 API 데이터를 차트에서 사용할 수 있는 형태로 변환하는 함수 */
export const formatChartData = (
  weatherData: WeatherData | null
): ChartData[] => {
  if (!weatherData?.daily) return [];

  const { time, temperature_2m_max, temperature_2m_min, precipitation_sum } =
    weatherData.daily;

  return time.map((dateString: string, index: number) => ({
    date: new Date(dateString).toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
    }),
    maxTemp: Math.round(temperature_2m_max[index] ?? 0),
    minTemp: Math.round(temperature_2m_min[index] ?? 0),
    precipitation: precipitation_sum[index] ?? 0,
  }));
};

/* 특정 국가의 날씨 데이터를 Open-Meteo API에서 가져오는 함수 */
export const fetchWeatherDataForCountry = async (
  country: Country
): Promise<WeatherData> => {
  const [latitude, longitude] = country.latlng || [];

  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
    daily: "temperature_2m_max,temperature_2m_min,precipitation_sum",
    timezone: "auto",
    forecast_days: "7",
  });

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params}`
  );

  if (!response.ok) {
    throw new Error(`날씨 정보를 가져올 수 없습니다: ${response.status}`);
  }

  return response.json();
};
