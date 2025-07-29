"use client";

import { createContext, useState, useEffect, useCallback } from "react";
import { useGeolocation } from "@flights-search-app/hooks";
import { CustomCardComponent } from "@flights-search-app/components";
import { useLazyGetAllConfigsQuery, useLazyGetAllLocalesQuery } from "@flights-search-app/services/locale_services";

export const HeaderContext = createContext<HeaderContextType>({} as HeaderContextType);

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const { userLocation } = useGeolocation();
  const [ConfigTrigger] = useLazyGetAllConfigsQuery();
  const [LocaleTrigger] = useLazyGetAllLocalesQuery();

  const [userConfigData, setUserConfigData] = useState<ConfigData>();
  const [userLocaleData, setUserLocaleData] = useState<LocaleData>();
  const [userCurrentLocationData, setUserCurrentLocationData] = useState<UserCurrentLocation>();

  const getConfigLocation = useCallback(async () => {
    setUserConfigData((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      const response = await ConfigTrigger().unwrap();
      if (response?.data?.length > 0) {
        const defaultLocation = response.data.find((item) => item.country === "United States");
        const userCurrentLocation = response.data.find((item) => item.country === userLocation?.country);

        setUserConfigData({
          data: userCurrentLocation ?? defaultLocation,
          isLoading: false,
          error: null,
        });
      }
    } catch (err) {
      setUserConfigData({
        ...userConfigData,
        isLoading: false,
        error: err,
      });
    }
  }, [ConfigTrigger, userLocation?.country]);

  const getLocaleLocation = useCallback(async () => {
    setUserLocaleData((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      const response = await LocaleTrigger().unwrap();
      if (response?.data?.length > 0 && userConfigData?.data?.market) {
        const defaultLocale = response.data.find((item) => item.id === "en-US");
        const userLocale = response.data.find((item) => item.id === userConfigData.data.market);

        setUserLocaleData({
          data: userLocale ?? defaultLocale,
          isLoading: false,
          error: null,
        });
      }
    } catch (err) {
      setUserLocaleData({
        ...userLocaleData,
        isLoading: false,
        error: err,
      });
    }
  }, [LocaleTrigger, userConfigData]);

  useEffect(() => {
    if (userLocation) {
      setUserCurrentLocationData(userLocation);
      getConfigLocation();
    }
  }, [getConfigLocation, userLocation]);

  useEffect(() => {
    if (userLocation && userConfigData?.data) {
      getLocaleLocation();
    }
  }, [getLocaleLocation, userConfigData, userLocation]);

  return (
    <HeaderContext.Provider value={{ userConfigData, userLocaleData, setUserConfigData, setUserLocaleData, userCurrentLocationData }}>
      <div className="fixed z-[999] bg-white w-full top-0 shadow-lg shadow-slate-600/10 px-6">
        <div className="flex items-end gap-4 flex-row">
          <CustomCardComponent title={userLocaleData?.data?.text} />
          <CustomCardComponent title={userConfigData?.data?.country} description={`${userConfigData?.data?.currencySymbol} ${userConfigData?.data?.currency}`} />
        </div>
      </div>
      {children}
    </HeaderContext.Provider>
  );
};
