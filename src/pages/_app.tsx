import { AppProps } from "next/app";
import "../styles/globals.css";
import Navbar from "../components/Navbar/Navbar";

import {createClient, WagmiConfig, configureChains } from "wagmi";
import {polygon} from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

import { ConnectKitProvider, getDefaultClient  } from "connectkit";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const { chains, provider } = configureChains(
  [
    polygon
  ],
  [publicProvider()]
);


const client = createClient(
  getDefaultClient({
    appName: "Peronio dApp",
    provider,
    chains
  }),
);



function MyApp({ Component, pageProps }: AppProps) {

  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider  options={{
          language: "es-ES",
          hideNoWalletCTA: true,
          embedGoogleFonts: true,
          walletConnectCTA: "both",
        }}
        customTheme={{
          "--ck-connectbutton-font-size": "16px",
          "--ck-connectbutton-border-radius": "10px",
          "--ck-connectbutton-background": "#00B7C2",
          "--ck-connectbutton-box-shadow": "#00B7C2",
          "--ck-body-background": "#1B262C",
          "--ck-body-background-transparent": "#1B262C",
          "--ck-primary-button-background": "#00B7C2",
        }}>
        <Navbar />
        <Component {...pageProps} />
      </ConnectKitProvider>
    </WagmiConfig>
      
  );
}

export default MyApp;
