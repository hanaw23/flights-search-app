"use client";

import Image from "next/image";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import dayjs from "dayjs";

interface FlightsCardProps {
  data: Itinerary;
}

const FlightsCardComponent = ({ data }: FlightsCardProps) => {
  const leg = data?.legs[0];
  const airline = leg?.carriers?.marketing?.[0];
  const airlineName = airline?.name || "Unknown Airline";
  const airlineLogo = airline?.logoUrl;

  return (
    <div className="w-full bg-white/90 rounded-2xl shadow-md shadow-black/20 p-8 mb-6 hover:shadow-lg transition-all duration-300 cursor-pointer ">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-lg font-semibold text-slate-900">{`${leg?.origin?.country} (${leg?.origin?.id}) - ${leg?.destination?.country} (${leg?.destination?.id})`}</div>
          <div className="text-sm text-gray-500">{airlineName}</div>
        </div>
        {airlineLogo && <Image src={airlineLogo} alt="Plane Icon" width={40} height={40} priority />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-gray-800">
        <div className="flex items-center gap-2">
          <FlightTakeoffIcon fontSize="small" className="text-sky-300" />
          <span>
            <strong className="mr-2">Departure:</strong>
            {dayjs(leg?.departure).format("D MMMM YYYY, h:mm A")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FlightLandIcon fontSize="small" className="text-sky-700" />
          <span>
            <strong className="mr-2">Arrival:</strong>
            {dayjs(leg?.arrival).format("D MMMM YYYY, h:mm A")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <AttachMoneyIcon fontSize="small" className="text-slate-900" />
          <span>
            <strong className="mr-2">Price:</strong>
            {data?.price?.formatted}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <StopCircleIcon fontSize="small" className="text-red-800" />
          <span>
            <strong className="mr-2">Stop Count:</strong>
            {leg?.stopCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FlightsCardComponent;
