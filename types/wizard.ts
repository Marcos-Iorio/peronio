export interface IWizardModal {
  children: React.ReactNode;
}

export interface IWizardContext {
  isOpen: boolean;
  openModalHandler?: () => void;
  isConnected: boolean;
  activeStep: number;
  setActiveStep?: (value: number) => void;
  closeModalHandler?: () => void;
  handleConnection?: () => void;
}
