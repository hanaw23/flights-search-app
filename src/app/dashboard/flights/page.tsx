"use client";

import { useSearchParams } from "next/navigation";
import ScrollCardListComponent from "@flights-search-app/components/cards/scroll_card";

const FlightsPage = () => {
  const searchParams = useSearchParams();
  const params = searchParams.get("params") || "";
  const parseParams = JSON.parse(params);

  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-slate-950 to-white p-6 sm:p-8 ">
      <ScrollCardListComponent params={parseParams} />
    </div>
  );
};

export default FlightsPage;
