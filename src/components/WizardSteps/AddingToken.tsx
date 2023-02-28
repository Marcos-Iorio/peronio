import { useWizard } from "react-use-wizard";

import Image from "next/image";

import manoPeron from "/public/mano-peron.png";
import { useBalance, useAccount, Address } from "wagmi";
import { useState } from "react";

const AddingToken = () => {
  const [peronioIsAdded, setPeronioIsAdded] = useState<boolean>(false);
  const [usdtIsAdded, setUsdtIsAdded] = useState<boolean>(false);

  const { address } = useAccount();

  const { data } = useBalance({
    address: address as Address,
    token: "0x78a486306D15E7111cca541F2f1307a1cFCaF5C4"
  });

  const addPeronio = async () => {
    const wasAdded = await window.ethereum?.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: "0x78a486306D15E7111cca541F2f1307a1cFCaF5C4",
          symbol: "P",
          decimals: 6
        }
      }
    });

    if (wasAdded) {
      setPeronioIsAdded(true);
    }
  };

  const addUSDT = async () => {
    const wasAdded = await window.ethereum?.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
          symbol: "USDT",
          decimals: 6
        }
      }
    });

    if (wasAdded) {
      setUsdtIsAdded(true);
    }
  };

  return (
    <div className="flex 2xl:flex-col laptop:flex-row xl:flex-col xl:gap-10 justify-center px-10 py-3 relative h-full">
      <div>
        <h1 className="font-Abril text-3xl mb-5">¡Agregando Peronio y USDT!</h1>
        <p className="text-Roboto text-xl ">
          Vamos a agregar P y USDT, son las 2 tokens que necesitarás para
          empezar a usar Peronio.
        </p>
        <p className="text-Roboto text-xl">
          Para hacer transacciones vas a necesitas MATIC, la moneda nativa de
          Polygon.
        </p>
      </div>

      {!peronioIsAdded ? (
        <button
          onClick={addPeronio}
          className="rounded-lg mt-auto mb-24 bg-[#FDCC9F] py-3 px-5 shadow-modal-button text-[#0B4D76] font-bold font-Roboto text-xl text-center hover:shadow-modal-button-hover transition-all delay-150 w-2/3"
        >
          Agregar P
        </button>
      ) : (
        <button
          onClick={addUSDT}
          disabled={usdtIsAdded ? true : false}
          className="rounded-lg mt-auto mb-24 bg-[#FDCC9F] py-3 px-5 shadow-modal-button text-[#0B4D76] font-bold font-Roboto text-xl text-center hover:shadow-modal-button-hover transition-all delay-150 w-2/3"
        >
          {!usdtIsAdded ? "Agregar USDT" : "Listo!"}
        </button>
      )}
      <Image
        src={manoPeron}
        width={60}
        height={60}
        alt="Mano de Perón"
        className="absolute 2xl:-bottom-[23px] xl:bottom-[11px] xl:left-14 z-0 laptop:right-32 2xl:left-14 xl:w-10 xl:h-auto 2xl:w-[60px] 2xl:h-[auto]"
      />
    </div>
  );
};

export default AddingToken;
