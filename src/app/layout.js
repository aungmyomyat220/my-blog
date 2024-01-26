'use client'
import './globals.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { Provider } from 'react-redux';
import {configureStore} from "@reduxjs/toolkit";
import { Roboto } from 'next/font/google'
import loveReducer from '../../Global Redux/createSlice/loveSlice';
import viewReducer from '../../Global Redux/createSlice/viewSlice';
import postReducer from '../../Global Redux/createSlice/postSlice';
import {AblyProvider} from "ably/react";
import Ably from "ably/callbacks";

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
})

const store = configureStore({
    reducer: {
        love: loveReducer,
        view: viewReducer,
        post : postReducer
    },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
        staleTime : 0,
      refetchOnWindowFocus: true,
    },
  },
})

const ablyConfig = {
    key: "HAJ3rA.-aJ6Gg:4AP_fA8YNIEL7OoSmMn1ZKfAb937_pDM5_7dhrON4KI",
    clientId: "aungmyomyat874@gmail.com",
};

// Initialize Ably Realtime
const realtime = new Ably.Realtime.Promise(ablyConfig);
realtime.auth.createTokenRequest({ clientId: ablyConfig.clientId }, (err, tokenRequest) => {
    if (!err) {
        console.log('Token Request:', tokenRequest);
    } else {
        console.error('Error creating token request:', err);
    }
});


export default function RootLayout({ children }) {
  return (
      <Provider store={store}>
          <QueryClientProvider client={queryClient}>
              <AblyProvider client={realtime}>
                  <html lang="en">
                  <head>
                      <title>My Blog</title>
                  </head>
                      <body className={roboto.className}>{children}</body>
                  </html>
              </AblyProvider>
          </QueryClientProvider>
      </Provider>
  )
}
