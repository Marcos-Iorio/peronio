import { useAddress } from "@thirdweb-dev/react";
import { useDisconnect } from "@thirdweb-dev/react";

interface Props {
  openModal: () => void;
}

const ConnectWallet = ({ openModal }: Props) => {
  const address = useAddress();

  const disconnect = useDisconnect();

  return (
    <>
      {address ? (
        <button
          onClick={disconnect}
          className="xl:ml-auto xl:basis-[8%] font-Roboto bg-[#00B7C2] text-[#1B262C] font-bold h-10 rounded-sm hover:bg-transparent hover:border-solid hover:border-[#00B7C2] hover:border hover:text-[#00B7C2] delay-100 transition-all"
        >
          {address}
        </button>
      ) : (
        <button
          onClick={() => openModal()}
          className="xl:ml-auto xl:basis-[8%] font-Roboto bg-[#00B7C2] text-[#1B262C] font-bold h-10 rounded-sm hover:bg-transparent hover:border-solid hover:border-[#00B7C2] hover:border hover:text-[#00B7C2] delay-100 transition-all"
        >
          Conectar
        </button>
      )}
    </>
  );
};

export default ConnectWallet;
