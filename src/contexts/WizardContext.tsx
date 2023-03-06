import React, { createContext, useState, useEffect } from "react";
import { IWizardContext, IWizardModal } from "../../types/wizard";
import { useAccount } from "wagmi";

const initialState = {
  isOpen: false,
  isConnected: false,
  activeStep: 0
};

let hasMetamaskOrCoinbase: boolean | undefined;

export const WizardContext = createContext<IWizardContext>(initialState);

const WizardProvider = ({ children }: IWizardModal) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  const { address } = useAccount();

  const openModalHandler = () => {
    setIsOpen(true);
  };

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      hasMetamaskOrCoinbase =
        window.ethereum?.isCoinbaseWallet || window.ethereum?.isMetaMask;
    }

    if (address !== undefined) {
      setIsConnected(true);
      setActiveStep(2);
    } else if (hasMetamaskOrCoinbase) {
      setIsConnected(false);
      setActiveStep(1);
    } else {
      setActiveStep(0);
    }
  }, [address, isConnected]);

  const handleConnection = () => {
    setIsConnected(true);
  };

  return (
    <WizardContext.Provider
      value={{
        isOpen,
        isConnected,
        activeStep,
        openModalHandler,
        closeModalHandler,
        handleConnection
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export default WizardProvider;
