import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '../styles/globals.css'
import axios from 'axios';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

// query
const queryClient = new QueryClient({
  defaultOptions: {
     queries: {
      cacheTime: 1 * 60 * 60 * 1000,
      staleTime: 1 * 60 * 60 * 1000,
    },
  },
});

axios.defaults.baseURL = 'https://www.themealdb.com/api/json/v1/1/';


export default function App({ Component, pageProps }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
      <Component {...pageProps} />
      <ReactQueryDevtools  initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );

}
