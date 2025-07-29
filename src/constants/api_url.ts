const BASE_URL = process.env.NEXT_PUBLIC_PATH_URL as string;
const HEADER_KEY = process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY as string;
const HEADER_HOST = process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST as string;

const LOCALE_URL_PATH = {
  get_locale: "api/v1/getLocale",
  get_configs: "api/v1/getConfig",
};

const FLIGHT_URL_PATH = {
  get_near_by_airports: `api/v1/flights/getNearByAirports`,
  get_airports: "api/v1/flights/searchAirport",
  get_flights: "api/v2/flights/searchFlights",
};

export { BASE_URL, HEADER_KEY, HEADER_HOST, LOCALE_URL_PATH, FLIGHT_URL_PATH };
