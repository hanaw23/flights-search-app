import { useCallback, useState, useEffect } from "react";

export const useGeolocation = () => {
  const [userLocation, setUserLocation] = useState<UserCurrentLocation | null>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const setCoordinate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          if (latitude && longitude) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_OPEN_STREET_MAP}?lat=${latitude}&lon=${longitude}&format=json`);
            const data = await response.json();
            const country = data.address?.country;

            setUserLocation({ latitude, longitude, country });
          }
        },
        (error) => {
          setErrorMessage(`Error get user location: ${error}`);
        }
      );
    } else {
      setErrorMessage(`Geolocation is not supported by this browser`);
    }
  };

  useEffect(() => {
    setCoordinate();
  }, []);

  return { userLocation, setCoordinate, errorMessage };
};
