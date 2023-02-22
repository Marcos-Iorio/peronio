import { useWizard } from "react-use-wizard";
import { motion } from "framer-motion";
import Image from "next/image";

import manoPeron from "/public/mano-peron.png";

const WalletInstallation = () => {
  return (
    <div className="flex flex-col px-10 py-3 relative h-full mobile:px-0">
      <h1 className="font-Abril text-3xl mb-5">¿Cómo arrancar?</h1>
      <p className="text-Roboto text-xl ">
        Vamos a instalar una Wallet. Hay muchas en el mercado, las más famosas
        son Metamask y Coinbase.
      </p>
      <p className="text-Roboto text-xl">
        Estás Wallets son extensiones para el navegador y también están cómo
        aplicación para el celular.
      </p>
      <p className="mt-3 text-Roboto text-yellow-400">
        Una vez lo hayas instalado y te hayas creado una cuenta, refrescá la
        página.
      </p>
      <a
        href="https://metamask.io/"
        target="_blank"
        rel="noreferrer"
        className="rounded-lg mt-auto mb-24 bg-[#FDCC9F] py-3 px-5 shadow-modal-button text-[#0B4D76] font-bold font-Roboto text-xl text-center hover:shadow-modal-button-hover transition-all delay-150 w-2/3"
      >
        Instalar Metamask
      </a>

      <Image
        src={manoPeron}
        width={60}
        height={60}
        alt="Mano de Perón"
        className="absolute -bottom-10 z-0 left-14"
      />
    </div>
  );
};

export default WalletInstallation;
