import Image from "next/image";
import Link from "next/link";
import ConnectWallet from "../../ConnectWalletButton/ConnectWallet";

import logo from "/public/logo-white.png";

interface NavbarProps {
  openModal: () => void;
}

const Navbar = (props: NavbarProps) => {
  return (
    <nav className="xl:flex xl:flex-col w-full items-center">
      <div className="xl:flex xl:flex-row xl:w-full xl:py-5 xl:px-12 xl:items-center">
        <div className="basis-2/12">
          <Image src={logo} alt="Logo Peronio" width={150} height={150}></Image>
        </div>

        <ul className="xl:basis-1/2 xl:flex xl:flex-row xl:gap-10 xl:items-center">
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
        <ConnectWallet openModal={props.openModal} />
      </div>
      <div className="bg-[#00B7C2] xl:w-[95%] xl:h-px"></div>
    </nav>
  );
};

export default Navbar;
