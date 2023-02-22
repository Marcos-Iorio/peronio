import {useContext} from 'react'
import { IWizardContext } from '../../../types/wizard';
import { WizardContext } from '../../contexts/WizardContext';

const WizardButton = () => {
  const {openModalHandler} = useContext(WizardContext)

  return (
    <button
      onClick={openModalHandler}
      className="border-[#00B7C2] border-solid border-2 rounded-xl text-Roboto text-sm font-normal py-2 px-5 text-white shadow-wizard-button"
    >
      ¿Cómo comenzar?
    </button>
  );
};

export default WizardButton;
