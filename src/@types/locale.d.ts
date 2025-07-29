interface Locale {
  text: string;
  id: string;
}

interface Config {
  country: string;
  countryCode: string;
  market: string;
  currencyTitle: string;
  currency: string;
  currencySymbol: string;
  site: string;
}

interface LocaleResponseData extends BaseMeta {
  data: Array<Locale>;
}
interface ConfigResponseData extends BaseMeta {
  data: Array<Config>;
}

type LocaleResponse = LocaleResponseData;
type ConfigResponse = ConfigResponseData;

// HOOKS LOCATION
interface UserCurrentLocation {
  longitude: number;
  latitude: number;
  country?: string;
}

// CONTEXT INTERFACES
interface BaseData {
  error: string;
  isLoading: boolean;
}

interface ConfigData extends Omit<BaseData> {
  data: Config;
}
interface LocaleData extends Omit<BaseData> {
  data: Locale;
}

interface HeaderContextType {
  userConfigData: ConfigData;
  setUserConfigData: React.Dispatch<React.SetStateAction<ConfigData>>;
  setUserLocaleData: React.Dispatch<React.SetStateAction<LocaleData>>;
  userLocaleData: LocaleData;
  userCurrentLocationData: UserCurrentLocation;
}
