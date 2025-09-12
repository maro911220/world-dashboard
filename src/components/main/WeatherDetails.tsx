import { WeatherDetailsProps } from "@/lib/types";
import { formatChartData } from "@/lib/api/weather";
import CountryInfo from "./weather/CountryInfo";
import TemperatureChart from "./weather/TemperatureChart";
import PrecipitationChart from "./weather/PrecipitationChart";
import CurrentWeatherMetrics from "./weather/CurrentWeatherMetrics";

/* 디테일 */
export default function WeatherDetails({
  country,
  weatherData,
}: WeatherDetailsProps) {
  const chartData = formatChartData(weatherData);

  return (
    <div className="weather-details-container">
      <CountryInfo country={country} />
      <CurrentWeatherMetrics weatherData={weatherData} />
      <div className="chart-container">
        <TemperatureChart chartData={chartData} />
        <PrecipitationChart chartData={chartData} />
      </div>
    </div>
  );
}
