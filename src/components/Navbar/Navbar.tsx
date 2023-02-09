import Image from "next/image";
import Link from "next/link";
import ConnectWallet from "../ConnectWalletButton/ConnectWallet";

import logo from "/public/logo-white.png";

interface NavbarProps {
  openModal: () => void;
}

const Navbar = (props: NavbarProps) => {
  return (
    <nav className="2xl:flex 2xl:flex-col xl:flex xl:flex-col w-full items-center z-50">
      <div className="2xl:flex 2xl:flex-row 2xl:w-full 2xl:py-5 2xl:px-12 2xl:items-center xl:flex xl:flex-row xl:w-full xl:py-5 xl:px-12 xl:items-center ">
        <div className="basis-2/12">
          <Image src={logo} alt="Logo Peronio" width={150} height={150}></Image>
        </div>
        <div className="relative">
        <ul className="2xl:basis-1/2 2xl:flex 2xl:flex-row 2xl:gap-10 2xl:items-center xl:basis-1/2 xl:flex xl:flex-row xl:gap-10 xl:items-center">
          <li>
            <Link href="/emitir" className="text-white font-Roboto">
              Emitir
            </Link>
          </li>
          <li>
            <Link href="/retirar" className="text-white font-Roboto">
              Retirar
            </Link>
          </li>
          <li>
            <Link href="/migrar" className="text-white font-Roboto">
              Migrar
            </Link>
          </li>
          <li>
            <Link href="/exchange" className="text-white font-Roboto">
              Exchange
            </Link>
          </li>
        </ul>
        </div>
        
        <ConnectWallet openModal={props.openModal} />
      </div>
      <div className="bg-[#00B7C2] 2xl:w-[95%] 2xl:h-px xl:w-[93%] xl:h-px"></div>
    </nav>
  );
};

export default Navbar;
