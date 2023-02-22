export interface IWizardModal {
    children: React.ReactNode;
}

export interface IWizardContext {
    isOpen: boolean,
    openModalHandler?: () => void,
    isConnected: boolean,
    setIsConnected?: (value: boolean) => void,
    activeStep: number,
    setActiveStep?: (value: number) => void
    closeModalHandler?: () => void
}

