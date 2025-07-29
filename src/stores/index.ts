import { configureStore } from "@reduxjs/toolkit";
import { localeServices } from "@flights-search-app/services/locale_services";
import { flightServices } from "@flights-search-app/services/flight_services";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [localeServices.reducerPath]: localeServices.reducer,
    [flightServices.reducerPath]: flightServices.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localeServices.middleware).concat(flightServices.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
