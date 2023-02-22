import { AppProps } from "next/app";
import { useContext, useState } from "react";
import "../styles/globals.css";
import Navbar from "../components/Navbar/Navbar";
import MobileNavbar from "../components/Navbar/MobileNavbar";

import { WagmiConfig, createClient } from "wagmi";
import { polygon } from "wagmi/chains";
import { ConnectKitProvider, getDefaultClient } from "connectkit";

import { useMediaQuery } from "react-responsive";
import WizardProvider from "../contexts/WizardContext";

const client = createClient(
  getDefaultClient({
    appName: "Peronio dApp",
    //infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    //alchemyId:  process.env.NEXT_PUBLIC_ALCHEMY_ID,
    chains: [polygon]
  })
);

function MyApp({ Component, pageProps }: AppProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <WizardProvider>
      <WagmiConfig client={client}>
        <ConnectKitProvider
          options={{
            language: "es-ES",
            hideNoWalletCTA: true,
            embedGoogleFonts: true,
            walletConnectCTA: "both"
          }}
          customTheme={{
            "--ck-connectbutton-font-size": "16px",
            "--ck-connectbutton-border-radius": "10px",
            "--ck-connectbutton-background": "#00B7C2",
            "--ck-connectbutton-box-shadow": "#00B7C2",
            "--ck-body-background": "#1B262C",
            "--ck-body-background-transparent": "#1B262C",
            "--ck-primary-button-background": "#00B7C2"
          }}
        >
          {isMobile ? (
            <MobileNavbar />
          ) : (
            <Navbar/>
          )}
          <Component {...pageProps} />
        </ConnectKitProvider>
      </WagmiConfig>  
    </WizardProvider>
      
  );
}

export default MyApp;
