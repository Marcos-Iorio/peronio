import { useAddress, useDisconnect } from "@thirdweb-dev/react";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface Props {
  openModal: () => void;
}

const ConnectWallet = ({ openModal }: Props) => {
  const address = useAddress();

  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

  const truncateAddress = (address: string) => {
    const match = address.match(truncateRegex);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };

  const disconnect = useDisconnect();

  return (
    <>
      {address && (
        <Menu as="div" className="relative contents">
          <Menu.Button className="group xl:ml-auto xl:basis-[9%] font-Roboto bg-[#00B7C2] text-[#1B262C] font-bold h-10 rounded-md hover:bg-transparent hover:border-solid hover:border-[#00B7C2] hover:border hover:text-[#00B7C2] delay-100 transition-all flex flex-row justify-center items-center">
            {truncateAddress(address)}
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-[#1B262C] group-hover:text-[#00B7C2] delay-100 transition-all"
              aria-hidden="true"
            />
          </Menu.Button>
          <Menu.Items className="absolute p-3 right-12 top-[6%] mt-2 w-56 origin-top-left border-solid border-2 border-[#00B7C2] rounded-md bg-[#0B4D76]/50 backdrop-blur-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item
              as="div"
              className="font-Robot p-2 flex flex-row w-full items-center text-lg text-[#00b7c2] rounded-md hover:bg-[#1B262C]"
            >
              <div className="mr-2 basis-[5%]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                  />
                </svg>
              </div>
              <span className="font-Roboto text-bold">Monedero</span>
            </Menu.Item>
            <Menu.Item
              as="div"
              className="font-Robot p-2 flex flex-row w-full items-center text-lg text-[#00b7c2] rounded-md hover:bg-[#1B262C]"
            >
              <div className="mr-2 basis-[5%]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  />
                </svg>
              </div>
              <span className="font-Roboto text-bold">Transacciones</span>
            </Menu.Item>
            <Menu.Item
              as="div"
              className="font-Robot text-lg text-[#00b7c2] p-2 flex flex-row w-full items-center rounded-md hover:bg-[#1B262C]"
            >
              <div className="mr-2 basis-[5%]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
              </div>
              <button onClick={disconnect} className="font-Roboto text-bold">
                Desconectar
              </button>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      )}
      {!address && (
        <button
          onClick={() => openModal()}
          className="xl:ml-auto xl:basis-[8%] font-Roboto bg-[#00B7C2] text-[#1B262C] font-bold h-10 rounded-md hover:bg-transparent hover:border-solid hover:border-[#00B7C2] hover:border hover:text-[#00B7C2] delay-100 transition-all"
        >
          Conectar
        </button>
      )}
    </>
  );
};

export default ConnectWallet;
