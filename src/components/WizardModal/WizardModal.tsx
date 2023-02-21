import { Wizard } from "react-use-wizard";
import { motion } from "framer-motion";

interface IOverlay {
  children: React.ReactNode;
}

const Overlay = ({ children }: IOverlay) => {
  return (
    <div className="fixed left-0 top-0 h-full w-full bg-black/50 backdrop-blur-sm grid place-content-center">
      {children}
    </div>
  );
};

const WizardModal = () => {
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
    <Overlay>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        className=" w-[500px] h-[200px] bg-white p-10 rounded-lg"
      >
        <Wizard>
          <div>Instalador</div>
        </Wizard>
      </motion.div>
    </Overlay>
  );
};

export default WizardModal;
