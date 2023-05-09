import "@/styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Script src="https://statics.teams.microsoft.com/sdk/v1.11.0/js/MicrosoftTeams.min.js"></Script>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
