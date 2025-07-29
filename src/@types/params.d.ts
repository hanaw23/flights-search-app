type FlightsSearchParams = {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string | Date;
  returnDate?: string | Date;
  cabinClass?: "economy" | "premium_economy" | "business" | "first";
  adults?: number;
  children?: number;
  infants?: number;
  sortBy?: "best" | "price_high" | "fastest" | "outbound_take_off_time" | "outbound_landing_time" | "return_take_off_time" | "return_landing_time";
  limit?: number;
  carriersIds?: string;
  currency?: string;
  market?: string;
  countryCode?: string;
};

type AirportsSearchParams = {
  query: string;
  locale?: string;
};

type AirportsNearLocationSearchParams = {
  lng: string;
  lat: string;
  locale?: string;
};

type Primitive = string | number | boolean | Date;
type ParamValue = Primitive | Primitive[] | undefined | null;
type ParamsObject = Record<string, ParamValue>;
