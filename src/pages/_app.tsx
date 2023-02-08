import { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Navbar from "../components/Navbar/Navbar";
import WalletsModal from "../components/WalletsModal/WalletsModal";
import { useState } from "react";

import { useAddress } from "@thirdweb-dev/react";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Polygon;

function MyApp({ Component, pageProps }: AppProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <Navbar openModal={openModal} />
      {isOpen && <WalletsModal isOpen={isOpen} closeModal={closeModal} />}
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
