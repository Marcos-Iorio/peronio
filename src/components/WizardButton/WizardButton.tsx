interface IWizardButton {
  open: (value: boolean) => void;
}

const WizardButton = ({ open }: IWizardButton) => {
  return (
    <button
      onClick={() => open(true)}
      className="bg-[#00B7C2] rounded-xl text-Roboto font-bold py-2 px-5 text-white ml-auto shadow-wizard-button animate-neon "
    >
      Comenzar Instalador
    </button>
  );
};

export default WizardButton;
