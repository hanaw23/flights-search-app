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
