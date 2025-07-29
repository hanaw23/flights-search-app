"use client";

import { useCallback, useEffect, useState } from "react";
import FlightCardComponent from "@flights-search-app/components/cards/flights_card";
import { useLazyGetAllFlightsQuery } from "@flights-search-app/services/flight_services";
import { Skeleton, Alert } from "@mui/material";

interface ScrollCardProps {
  params: FlightsSearchParams;
}

const FlightCardSkeleton = () => (
  <div className="rounded-xl shadow-lg bg-white p-4 mb-4 w-full">
    <Skeleton variant="text" width="60%" height={32} />
    <div className="flex justify-between items-center mt-4">
      <Skeleton variant="text" width="40%" height={24} />
      <Skeleton variant="text" width="30%" height={24} />
    </div>
    <Skeleton variant="rectangular" height={100} className="mt-4 rounded-lg" />
  </div>
);

const ScrollCard = ({ params }: ScrollCardProps) => {
  const [getAllFlightsTrigger] = useLazyGetAllFlightsQuery();

  const [allFlights, setAllFlights] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getFlights = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllFlightsTrigger({ params }).unwrap();
      setAllFlights(response?.data?.itineraries ?? []);
    } catch (err) {
      setError(`Failed to fetch flights: ${err.data.message}`);
    } finally {
      setLoading(false);
    }
  }, [getAllFlightsTrigger, params]);

  useEffect(() => {
    getFlights();
  }, [getFlights]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {loading ? (
        <>
          <FlightCardSkeleton />
          <FlightCardSkeleton />
          <FlightCardSkeleton />
        </>
      ) : error ? (
        <Alert severity="error" className="mt-10 sm:mt-50">
          {error}
        </Alert>
      ) : (
        allFlights.map((val, index) => <FlightCardComponent key={index} data={val} />)
      )}
    </div>
  );
};

export default ScrollCard;
