import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_url } from "@flights-search-app/constants";

const { LOCALE_URL_PATH, BASE_URL, HEADER_KEY, HEADER_HOST } = api_url;

export const localeServices = createApi({
  reducerPath: "localeServices",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("x-rapidapi-key", HEADER_KEY);
      headers.set("x-rapidapi-host", HEADER_HOST);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllLocales: builder.query<LocaleResponse, void>({
      query: () => LOCALE_URL_PATH.get_locale,
    }),
    getAllConfigs: builder.query<ConfigResponse, void>({
      query: () => LOCALE_URL_PATH.get_configs,
    }),
  }),
});

export const { useLazyGetAllLocalesQuery, useLazyGetAllConfigsQuery } = localeServices;
