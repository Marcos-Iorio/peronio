import { useContext } from "react";
import { WizardContext } from "../../contexts/WizardContext";

const WizardButton = () => {
  const { openModalHandler } = useContext(WizardContext);

  return (
    <button
      onClick={openModalHandler}
      className="border-[#00B7C2] border-solid border-2 rounded-xl text-Roboto xl:text-sm font-normal xl:py-2 xl:px-5 xl:mt-0 text-white shadow-wizard-button mobile:mt-10 mobile:font-Abril mobile:text-3xl mobile:py-5"
    >
      ¿Cómo comenzar?
    </button>
  );
};

export default WizardButton;
