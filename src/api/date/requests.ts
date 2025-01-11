import { AvailableCountries, Holiday } from './types.ts';
import { useFetch } from '../../hooks/UseFetch.tsx';

const BASE_URL = 'https://date.nager.at/api/v3';

export const useGetAvailableCountries = () => {
  const { fetch, isLoading, data } = useFetch<AvailableCountries[]>({
    method: 'GET',
    url: BASE_URL + '/AvailableCountries',
  });
  const getAvailableCountries = () => fetch({});
  return { getAvailableCountries, isLoading, data };
};

export const useGetPublicHolidays = (year: number, countryCode: string) => {
  const { fetch, isLoading, data } = useFetch<Holiday[]>({
    method: 'GET',
    url:
      BASE_URL +
      '/PublicHolidays/{year}/{countryCode}'
        .replace('{year}', String(year))
        .replace('{countryCode}', countryCode),
  });
  const getPublicHolidays = () => fetch({});
  return { getPublicHolidays, isLoading, data };
};
