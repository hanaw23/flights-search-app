"use client";

import { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "@flights-search-app/stores/index";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
