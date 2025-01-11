import { useGetAvailableCountries, useGetPublicHolidays } from './requests';

export const useDateApi = () => {
  const {
    getAvailableCountries,
    isLoading: getAvailableCountriesLoading,
    data: getAvailableCountriesData,
  } = useGetAvailableCountries();

  const {
    getPublicHolidays,
    isLoading: getPublicHolidaysLoading,
    data: getPublicHolidaysData,
  } = useGetPublicHolidays();

  return {
    getAvailableCountries: {
      getAvailableCountries,
      isLoading: getAvailableCountriesLoading,
      data: getAvailableCountriesData,
    },
    getPublicHolidays: {
      getPublicHolidays,
      isLoading: getPublicHolidaysLoading,
      data: getPublicHolidaysData,
    },
  };
};
