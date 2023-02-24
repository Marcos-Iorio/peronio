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
import AddingToken from "../WizardSteps/AddingToken";

const Overlay = () => {
  const { closeModalHandler } = useContext(WizardContext);

  return (
    <div
      onClick={closeModalHandler}
      className="fixed left-0 top-0 h-full w-full bg-black/50 backdrop-blur-sm grid place-content-center z-10 cursor-pointer mobile:z-50"
    ></div>
  );
};

const WizardModal = () => {
  const { activeStep } = useContext(WizardContext);

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
      <Overlay />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 mobile:h-full xl:h-fit">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          className="relative z-50 bg-[#0B4D76] border-2 border-solid border-[#00B7C2] p-10 rounded-lg flex flex-col items-center 2xl:w-[1000px] laptop:w-[950px] laptop:h-[400px] 2xl:h-[600px] mobile:h-full mobile:w-full"
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
            className="text-center laptop:w-[150px] laptop:h-auto 2xl:w-[200px] 2xl:h-[200px]"
          />
          <div className="flex xl:flex-row mobile:flex-col w-full h-full gap-0 justify-start items-start">
            <div className="laptop:basis-full 2xl:basis-1/2 h-full mobile:basis-full">
              <Wizard startIndex={activeStep}>
                <WalletInstallation />
                <WalletConnect />
                <PolygonNetwork />
                <AddingToken />
              </Wizard>
            </div>
            <div className="content-box w-fit basis-1/2 mobile:hidden laptop:hidden 2xl:block text-center">
              <Image
                src={sol}
                width={500}
                height={500}
                alt="Sol de la patría Argentina"
                style={{ filter: "drop-shadow(2px 4px 6px black);" }}
                className="laptop:w-[300px] laptop:h-auto 2xl:w-[500px] xl:h-auto"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default WizardModal;
