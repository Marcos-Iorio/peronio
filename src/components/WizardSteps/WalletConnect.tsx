import { useModal } from "connectkit";
import { useContext, useEffect } from "react";
import { useWizard } from "react-use-wizard";
import { useAccount } from "wagmi";
import { WizardContext } from "../../contexts/WizardContext";

const WalletConnect = () => {
  const { nextStep } = useWizard();
  const { address } = useAccount();
  const { handleConnection, isConnected } = useContext(WizardContext);

  const { open, setOpen } = useModal();

  const connectWalletHandler = () => {
    setOpen(true);
    handleConnection;

    setTimeout(() => {
      nextStep();
    }, 5000);
  };

  return (
    <div className="flex flex-col px-10 py-3 relative h-full">
      <h1 className="font-Abril text-3xl mb-5">
        ¡Ya tenés instalado Metamask!
      </h1>
      <p className="text-Roboto text-xl ">
        Ahora vamos a conectar el monedero para poder empezar a hacer
        transacciones.
      </p>
      <button
        onClick={connectWalletHandler}
        className="rounded-lg mt-auto mb-24 bg-[#FDCC9F] py-3 px-5 shadow-modal-button text-[#0B4D76] font-bold font-Roboto text-xl text-center hover:shadow-modal-button-hover transition-all delay-150 w-2/3"
      >
        Conectar monedero
      </button>
    </div>
  );
};

export default WalletConnect;
