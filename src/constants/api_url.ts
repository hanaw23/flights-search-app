const BASE_URL = process.env.NEXT_PUBLIC_PATH_URL as string;
const HEADER_KEY = process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY as string;
const HEADER_HOST = process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST as string;

const LOCALE_URL_PATH = {
  // get_locale: "v1/ac689098-7d7c-41f7-b6ca-46c94a448e91",
  // get_configs: "v1/429cf4b3-4a10-4384-b599-40f28ed4c608",
  get_locale: "api/v1/getLocale",
  get_configs: "api/v1/getConfig",
};

const FLIGHT_URL_PATH = {
  // get_near_by_airports: `v1/3cb8f30f-e377-4063-95d1-39f735d6d1ff?`,
  // get_airports: "v1/98eb1050-34dc-46d8-952c-3d14dc9dd5c9",
  // get_flights: "v1/400311c4-4853-4e1d-bf4c-c86d667c8d2d",
  get_near_by_airports: `api/v1/flights/getNearByAirports`,
  get_airports: "api/v1/flights/searchAirport",
  get_flights: "api/v2/flights/searchFlights",
};

export { BASE_URL, HEADER_KEY, HEADER_HOST, LOCALE_URL_PATH, FLIGHT_URL_PATH };
