import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_url } from "@flights-search-app/constants";
import { helpers } from "@flights-search-app/utils";

const { FLIGHT_URL_PATH, BASE_URL, HEADER_KEY, HEADER_HOST } = api_url;
const { setParams } = helpers;

export const flightServices = createApi({
  reducerPath: "flightServices",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("x-rapidapi-key", HEADER_KEY);
      headers.set("x-rapidapi-host", HEADER_HOST);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllNearAirports: builder.query<AirportNearLocationResponse, { params: AirportsNearLocationSearchParams }>({
      query: ({ params }) => {
        const newParams = setParams(params);
        return `${FLIGHT_URL_PATH.get_near_by_airports}?${newParams}`;
      },
    }),
    getAllAirports: builder.query<AirportNearLocationResponse, { params: AirportsSearchParams }>({
      query: ({ params }) => {
        const newParams = setParams(params);
        return `${FLIGHT_URL_PATH.get_airports}?${newParams}`;
      },
    }),
    getAllFlights: builder.query<FlightListResponse, { params: FlightsSearchParams }>({
      query: ({ params }) => {
        const newParams = setParams(params);
        return `${FLIGHT_URL_PATH.get_flights}?${newParams.toString()}`;
      },
    }),
  }),
});

export const { useLazyGetAllNearAirportsQuery, useLazyGetAllAirportsQuery, useLazyGetAllFlightsQuery } = flightServices;
