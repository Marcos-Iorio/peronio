import { useWizard } from "react-use-wizard";

import Image from "next/image";

import manoPeron from "/public/mano-peron.png";

const PolygonNetwork = () => {
  const { nextStep } = useWizard();

  return (
    <div className="flex 2xl:flex-col xl:flex-row xl:gap-10 justify-center items-center px-10 py-3 relative h-full">
      <div>
        <h1 className="font-Abril text-3xl mb-5">¡Estás usando Polygon!</h1>
        <p className="text-Roboto text-xl ">
          Polygon es una blockchain corriendo en la capa 2 del ecosistema Ethereum
          con fees muy bajos y transacciones rápidas es ideal para Peronio.
        </p>
        <p className="text-Roboto text-xl">
          Pasemos a agregar Peronio a tu monedero
        </p>
      </div>
      <button
        onClick={() => nextStep()}
        className="rounded-lg mt-auto mb-24 bg-[#FDCC9F] py-3 px-5 shadow-modal-button text-[#0B4D76] font-bold font-Roboto text-xl text-center hover:shadow-modal-button-hover transition-all delay-150 w-2/3"
      >
        Siguiente paso
      </button>
      <Image
        src={manoPeron}
        width={60}
        height={60}
        alt="Mano de Perón"
        className="absolute -bottom-10 z-0 laptop:right-32 2xl:left-14"
      />
    </div>
  );
};

export default PolygonNetwork;
