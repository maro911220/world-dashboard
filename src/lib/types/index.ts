export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  population: number;
  region: string;
  flag: string;
  latlng: number[];
}

export interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
  };
}

export interface ChartData {
  date: string;
  maxTemp: number;
  minTemp: number;
  precipitation: number;
}
export interface WeatherDetailsProps {
  country: Country;
  weatherData: WeatherData;
}
export interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

export interface CountriesSidebarProps {
  countries: Country[];
  selectedCountry: Country | null;
  onSelectCountry: (country: Country) => void;
}

export interface CountryListItemProps {
  country: Country;
  isSelected: boolean;
  onSelectCountry: (country: Country) => void;
}

export interface CountrySearchProps {
  selectedCountry: Country | null;
  onSelectCountry: (country: Country) => void;
}
