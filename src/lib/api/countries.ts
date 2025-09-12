import { Country } from "../types";

/* API 호출 공통 함수 */
const fetchCountryApi = async (endpoint: string): Promise<Country[]> => {
  const response = await fetch(`https://restcountries.com/v3.1/${endpoint}`);

  if (!response.ok) {
    const errorMessage =
      response.status === 404
        ? "검색 결과가 없습니다"
        : `오류 ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json();
};

/* 일괄 조회 함수 */
export const fetchCountriesByNames = async (
  names: string[]
): Promise<Country[]> => {
  const requests = names.map((name) =>
    fetchCountryApi(`name/${encodeURIComponent(name)}`).then((data) => data[0])
  );
  const results = await Promise.allSettled(requests);
  const data = results
    .filter(
      (result): result is PromiseFulfilledResult<Country> =>
        result.status === "fulfilled"
    )
    .map((result) => result.value);
  return data;
};

/* 이름으로 검색하는 함수 */
export const searchCountries = (term: string): Promise<Country[]> => {
  if (!term.trim()) return Promise.resolve([]);
  return fetchCountryApi(`name/${encodeURIComponent(term.trim())}`);
};

/* 초기 추천 지역 */
export const POPULAR_COUNTRIES = [
  "South Korea",
  "Japan",
  "United States",
  "China",
  "India",
  "Brazil",
  "Germany",
  "France",
  "United Kingdom",
  "Canada",
] as const;
