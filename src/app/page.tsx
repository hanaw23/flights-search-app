"use client";

import { useEffect, useState, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import { HeaderContext } from "@flights-search-app/context";
import { SearchFlightFormComponent } from "@flights-search-app/components";
import { useLazyGetAllNearAirportsQuery } from "@flights-search-app/services/flight_services";
import { page_names } from "@flights-search-app/constants";
import { Alert } from "@mui/material";

const { PageNames } = page_names;

const Home = () => {
  const router = useRouter();
  const { userCurrentLocationData, userLocaleData, userConfigData } = useContext(HeaderContext);
  const [getAllNearAirportsTrigger] = useLazyGetAllNearAirportsQuery();
  const [nearAirportLocationData, setNearAirportLocationData] = useState<{
    value: {
      skyId: string;
      entityId: string;
    };
    label: string;
  }>();
  const [loadingNearAirport, setLoadingNearAirport] = useState(false);
  const [errorGetNearAirport, setErrorGetNearAirport] = useState<string>("");

  const isError = userConfigData?.error || userLocaleData?.error;

  const getNearAirportLocation = useCallback(async () => {
    if (!userCurrentLocationData?.latitude || !userCurrentLocationData?.longitude || !userLocaleData?.data?.id) {
      return;
    }

    setLoadingNearAirport(true);
    try {
      const response = await getAllNearAirportsTrigger({
        params: {
          lng: userCurrentLocationData.longitude,
          lat: userCurrentLocationData.latitude,
          locale: userLocaleData.data.id,
        },
      }).unwrap();

      if (response?.data) {
        setNearAirportLocationData({
          value: {
            skyId: response?.data?.current?.navigation?.relevantFlightParams?.skyId,
            entityId: response?.data?.current?.navigation?.relevantFlightParams?.entityId,
          },
          label: `${response?.data?.current?.navigation?.relevantFlightParams?.localizedName} (${response?.data?.current?.navigation?.relevantFlightParams?.skyId})`,
        });
      }
    } catch (e) {
      setErrorGetNearAirport(`Error fetching nearby airports: ${e.data.message}`);
    }
    setLoadingNearAirport(false);
  }, [getAllNearAirportsTrigger, userCurrentLocationData?.latitude, userCurrentLocationData?.longitude, userLocaleData?.data?.id]);

  useEffect(() => {
    getNearAirportLocation();
  }, [getNearAirportLocation]);

  const submitNavigateToFlightsPage = (params: FlightsSearchParams) => {
    const jsonStrigyfyParams = JSON.stringify(params);
    router.push(`/${PageNames.flights_page}?params=${jsonStrigyfyParams}`);
  };

  return (
    <>
      {isError ? (
        <div className="p-20">
          <Alert severity="error" className="mt-10 sm:mt-50">
            {userConfigData?.error || userLocaleData?.error}
          </Alert>
        </div>
      ) : (
        <div className="font-sans min-h-screen bg-gradient-to-b from-slate-950 to-white relative flex items-center justify-center p-6 sm:p-8 overflow-y-hidden">
          <div className="w-full max-w-6xl p-6 sm:p-20 bg-white/90 rounded-2xl shadow-lg backdrop-blur-md">
            {loadingNearAirport ? (
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-slate-200 rounded w-1/3" />
                <div className="h-12 bg-slate-200 rounded w-full" />
                <div className="h-12 bg-slate-200 rounded w-full" />
                <div className="h-12 bg-slate-200 rounded w-full" />
                <div className="h-10 bg-slate-300 rounded w-1/4 mx-auto mt-6" />
              </div>
            ) : (
              <SearchFlightFormComponent currentUserLocation={nearAirportLocationData} locale={userLocaleData?.data?.id} userConfigData={userConfigData?.data} submit={submitNavigateToFlightsPage} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
