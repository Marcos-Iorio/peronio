import { Wizard } from "react-use-wizard";
import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import peronCafecito from "/public/peron.png";
import logo from "/public/logo-white.png";
import sol from "/public/sol-bg.svg";
import WalletInstallation from "../WizardSteps/WalletInstallation";
import PolygonNetwork from "../WizardSteps/PolygonNetwork";
import WalletConnect from "../WizardSteps/WalletConnect";
import { WizardContext } from "../../contexts/WizardContext";
import { useAccount } from "wagmi";


let hasMetamaskOrCoinbase: boolean | undefined;
let startedIndex = 0;


const Overlay = () => {
  const {closeModalHandler} = useContext(WizardContext)

  return (
    <div
      onClick={closeModalHandler}
      className="fixed left-0 top-0 h-full w-full bg-black/50 backdrop-blur-sm grid place-content-center z-10 cursor-pointer"
    >
    </div>
  );
};

const WizardModal = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      hasMetamaskOrCoinbase =
        window.ethereum?.isCoinbaseWallet || window.ethereum?.isMetaMask;
    }
    
    if (hasMetamaskOrCoinbase) {
      startedIndex = 1;
    } else {
      startedIndex = 0;
    } 
  },[])

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.15,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <Overlay/>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          className="relative z-50 bg-[#0B4D76] border-2 border-solid border-[#00B7C2] p-10 rounded-lg flex flex-col items-center 2xl:w-[1000px] laptop:w-[950px] laptop:h-[600px] 2xl:h-[600px]"
        >
          <div className="absolute -top-[100px] z-10 left-1/2 -translate-x-1/2">
            <div className="relative">
              <Image
                src={peronCafecito}
                height={150}
                width={150}
                alt="Peron tomandose un café"
              />
            </div>
          </div>
          <Image
            src={logo}
            alt="Logo Peronio"
            width={200}
            height={200}
            className="text-center"
          />
          <div className="flex flex-row w-full h-full gap-0 justify-start items-start">
            <div className="basis-1/2 h-full">
              <Wizard startIndex={startedIndex}>
                <WalletInstallation />
                <WalletConnect/>
                <PolygonNetwork />
              </Wizard>
            </div>
            <div className="content-box w-fit basis-1/2">
              <Image
                src={sol}
                width={500}
                height={500}
                alt="Sol de la patría Argentina"
                style={{ filter: "drop-shadow(2px 4px 6px black);" }}
                className="laptop:w-[350px] laptop:h-[350px]"
              />
            </div>
          </div>
        </motion.div>
      </div>
      
    </>
      
  );
};

export default WizardModal;
