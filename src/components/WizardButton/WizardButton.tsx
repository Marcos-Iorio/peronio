import { useContext } from "react";
import { WizardContext } from "../../contexts/WizardContext";
import {motion} from 'framer-motion'

const liVariant = {
  opened: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.25,
      ease: "easeOut"
    }
  },
  closed: {
    opacity: 0,
    y: "100%",
    transition: {
      duration: 0.25,
      ease: "easeInOut"
    }
  }
};

const WizardButton = () => {
  const { openModalHandler } = useContext(WizardContext);

  return (
    <motion.button
      onClick={openModalHandler}
      variants={liVariant}
      className="border-[#00B7C2] border-solid border-2 rounded-xl text-Roboto xl:text-sm font-normal xl:py-2 xl:px-5 xl:mt-0 text-white shadow-wizard-button mobile:mt-10 mobile:font-Abril mobile:text-2xl mobile:py-5"
    >
      ¿Cómo comenzar?
    </motion.button>
  );
};

export default WizardButton;
