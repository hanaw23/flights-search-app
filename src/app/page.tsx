"use client";

import { useEffect, useState, useContext, useCallback } from "react";
import { HeaderContext } from "@flights-search-app/context";
import { SearchFlightFormComponent } from "@flights-search-app/components";
import { useLazyGetAllNearAirportsQuery } from "@flights-search-app/services/flight_services";

const Home = () => {
  const { userCurrentLocationData, userLocaleData } = useContext(HeaderContext);
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
      setErrorGetNearAirport("Error fetching nearby airports");
    }
    setLoadingNearAirport(false);
  }, [getAllNearAirportsTrigger, userCurrentLocationData?.latitude, userCurrentLocationData?.longitude, userLocaleData?.data?.id]);

  useEffect(() => {
    getNearAirportLocation();
  }, [getNearAirportLocation]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center  p-8 gap-16 sm:p-80">
      <SearchFlightFormComponent currentUserLocation={nearAirportLocationData} locale={userLocaleData?.data?.id} />
    </div>
  );
};

export default Home;
