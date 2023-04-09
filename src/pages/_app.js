import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "@/styles/globals.css";
import GlobalContextProvider from "@/contexts/GlobalContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </QueryClientProvider>
  );
}
