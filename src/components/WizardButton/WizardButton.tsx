import { useContext } from "react";
import { WizardContext } from "../../contexts/WizardContext";
import { motion } from "framer-motion";

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
      className="border-[#00B7C2] border-solid border-2 rounded-xl text-Roboto xl:text-md font-normal xl:py-2 xl:px-10 xl:w-fit xl:mt-0 text-white shadow-wizard-button md:text-sm md:w-[24%] md:px-0 md:mt-0 md:py-2 mobile:mt-10 mobile:font-Abril mobile:text-2xl mobile:py-5"
    >
      ¿Cómo comenzar?
    </motion.button>
  );
};

export default WizardButton;
