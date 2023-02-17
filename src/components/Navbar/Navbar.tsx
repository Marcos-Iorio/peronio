import Image from "next/image";
import Link from "next/link";
import ConnectWallet from "../ConnectWalletButton/ConnectWallet";

import logo from "/public/logo-white.png";

const Navbar = () => {
  return (
    <nav className="2xl:flex 2xl:flex-col laptop:flex laptop:flex-col lg:flex-col md:flex-col md:flex w-full items-center z-50">
      <div className="2xl:flex 2xl:flex-row 2xl:w-full 2xl:py-5 2xl:px-12 2xl:items-center laptop:flex laptop:flex-row lg:flex-row md:flex md:flex-row md:py-5 md:px-7 md:w-full laptop:w-full laptop:py-5 laptop:px-12 laptop:items-center ">
        <Link href="/" className="basis-2/12">
          <Image src={logo} alt="Logo Peronio" width={150} height={150}></Image>
        </Link>
        <div className="relative md:basis-2/3 md:ml-7">
          <ul className="2xl:basis-1/2 2xl:flex 2xl:flex-row 2xl:gap-10 2xl:items-center laptop:basis-1/2 laptop:flex laptop:flex-row laptop:gap-10 laptop:items-center md:basis-2/3 md:flex md:flex-row md:gap-10 md:items-center">
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
        <ConnectWallet />
      </div>
      <div className="bg-[#00B7C2] 2xl:w-[95%] 2xl:h-px laptop:w-[93%] laptop:h-px md:w-[93%] md:h-px"></div>
    </nav>
  );
};

export default Navbar;
