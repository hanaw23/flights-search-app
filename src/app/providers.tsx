"use client";

import { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "@flights-search-app/stores/index";
import { HeaderProvider } from "@flights-search-app/context";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <HeaderProvider>{children}</HeaderProvider>
      </LocalizationProvider>
    </Provider>
  );
};

export default Providers;
