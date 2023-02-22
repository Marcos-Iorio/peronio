import React, { createContext, useState } from "react"
import { IWizardContext, IWizardModal } from "../../types/wizard"

const initialState = {
    isOpen: false,
    isConnected: false,
    activeStep: 0,
}

export const WizardContext = createContext<IWizardContext>(initialState)

const WizardProvider = ({children}: IWizardModal) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [activeStep, setActiveStep] = useState<number>(0);

    const openModalHandler = () => {
        setIsOpen(true)
    }

    const closeModalHandler = () => {
        setIsOpen(false)
    }

    return(
        <WizardContext.Provider value={{isOpen, isConnected, activeStep, openModalHandler, closeModalHandler}}>
            {children}
        </WizardContext.Provider>
    )
}

export default WizardProvider