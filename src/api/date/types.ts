export type AvailableCountries = {
  countryCode: string;
  name: string;
};

export type Holiday = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  global: true;
};
