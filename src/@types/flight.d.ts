interface Presentation {
  title: string;
  suggestionTitle: string;
  subtitle: string;
}

interface RelevantFlightParams {
  skyId: string;
  entityId: number;
  flightPlaceType: string;
  localizedName: string;
}

interface RelevantHotelParams {
  entityId: number;
  entityType: string;
  localizedName: string;
}

interface Navigation {
  entityId: number;
  entityType: string;
  localizedName: string;
  relevantFlightParams: RelevantFlightParams;
  relevantHotelParams: RelevantHotelParams;
}

interface AirportLocation {
  presentation: Presentation;
  navigation: Navigation;
}

interface AirportNearLocation {
  current: AirportLocation;
  nearby: Array<AirportLocation>;
  recent: Array<AirportLocation>;
}

interface FlightContext {
  status: string;
  sessionId: string;
  totalResults: number;
}

interface AirportEntity {
  id: string;
  entityId: string;
  name: string;
}

interface Airport {
  city: string;
  airports: Array<AirportEntity>;
}

interface Carrier {
  id: number;
  alternateId: string;
  logoUrl: string;
  name: string;
  minPrice: string;
  allianceId: number;
}

interface StopPriceDirection {
  isPresent: boolean;
  formattedPrice?: string;
  rawPrice?: number;
}

interface StopPrice {
  direct: StopPriceDirection;
  one: StopPriceDirection;
  twoOrMore: StopPriceDirection;
}

interface FlightFilterStatus {
  duration: {
    min: number;
    max: number;
    multiCityMin: number;
    multiCityMax: number;
  };
  total: number;
  hasCityOpenJaw: boolean;
  multipleCarriers: {
    minPrice: string;
    rawMinPrice?: string;
  };
  airports: Array<Airport>;
  carriers: Array<Carrier>;
  stopPrices: StopPrice;
  alliances: {
    id: number;
    name: string;
  };
}

interface Price {
  raw: number;
  formatted: string;
  pricingOptionId: string;
}

interface OriginDestinationFlight {
  id: string;
  entityId: string;
  name: string;
  displayCode: string;
  city: string;
  country: string;
  isHighlighted: boolean;
}

interface CarrierSubDataFlight {
  id: number;
  alternateId: string;
  logoUrl?: string;
  name: string;
  allianceId?: number;
  displayCode?: string;
}

interface OriginDestinationSegment {
  flightPlaceId: string;
  displayCode: string;
  parent: {
    flightPlaceId: string;
    displayCode: string;
    name: string;
    type: string;
  };
  name: string;
  type: string;
  country: string;
}

interface Segment {
  id: string;
  origin: OriginDestinationSegment;
  destination: OriginDestinationSegment;
  departure: string | Date;
  arrival: string | Date;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: Omit<CarrierSubDataFlight, "logoUrl">;
  operatingCarrier: Omit<CarrierSubDataFlight, "logoUrl">;
  transportMode: string;
}

interface Leg {
  id: string;
  origin: OriginDestinationFlight;
  destination: OriginDestinationFlight;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string | Date;
  arrival: string | Date;
  timeDeltaInDays: number;
  carriers: {
    marketing: Array<Omit<CarrierSubDataFlight, "allianceId" | "displayCode">>;
    operating: Array<Omit<CarrierSubDataFlight, "allianceId" | "displayCode">>;
  };
  segments: Array<Segment>;
}

interface Itinerary {
  id: string;
  price: Price;
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
  };
  fareAttributes?: string | unknown;
  tags: Array<string>;
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
  legs: Array<Leg>;
}

interface Flight {
  context: FlightContext;
  itineraries: Array<Itinerary>;
  messages: Array<string>;
  filterStats: FlightFilterStatus;
  flightsSessionId: string;
  destinationImageUrl: string;
}

interface AirportNearLocationResponseData extends BaseMeta {
  data: AirportNearLocation;
}
interface AirportLocationListResponseData extends BaseMeta {
  data: Array<AirportLocation>;
}
interface FlightListResponseData extends BaseMeta {
  data: Array<Flight>;
}

type AirportNearLocationResponse = AirportNearLocationResponseData;
type AirportLocationListResponse = AirportLocationListResponseData;
type FlightListResponse = FlightListResponseData;
