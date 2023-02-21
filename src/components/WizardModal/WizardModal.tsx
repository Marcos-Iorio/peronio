import { Wizard, useWizard } from "react-use-wizard";
import { motion } from "framer-motion";
import Image from "next/image";

import peronCafecito from "/public/peron.png";
import logo from "/public/logo-white.png";
import sol from "/public/sol-bg.svg";
import WalletInstallation from "../WizardSteps/WalletInstallation";
import PolygonNetwork from "../WizardSteps/PolygonNetwork";

interface IOverlay {
  children?: React.ReactNode;
  onClose: () => void;
}

let hasMetamaskOrCoinbase: boolean | undefined;

if (typeof window !== "undefined") {
  hasMetamaskOrCoinbase =
    window.ethereum?.isCoinbaseWallet || window.ethereum?.isMetaMask;
}

let startedIndex = 0;

if (hasMetamaskOrCoinbase) {
  startedIndex = 1;
} else {
  startedIndex = 0;
}

const Overlay = ({ children, onClose }: IOverlay) => {
  return (
    <div
      onClick={onClose}
      className="fixed left-0 top-0 h-full w-full bg-black/50 backdrop-blur-sm grid place-content-center"
    >
      {children}
    </div>
  );
};

const WizardModal = ({ onClose }: IOverlay) => {
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
    <Overlay onClose={onClose}>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        className="relative z-50 bg-[#0B4D76] border-2 border-solid border-[#00B7C2] p-10 rounded-lg flex flex-col items-center laptop:w-[1000px] laptop:h-[650px]"
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
            />
          </div>
        </div>
      </motion.div>
    </Overlay>
  );
};

export default WizardModal;
