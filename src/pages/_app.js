import "@/styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Script src="node_modules/@microsoft/teams-js@2.11.0/dist/MicrosoftTeams.min.js"></Script>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
