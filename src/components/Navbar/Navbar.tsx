import Image from "next/image";
import Link from "next/link";
import ConnectWallet from "../ConnectWalletButton/ConnectWallet";

import logo from "/public/logo-white.png";
import NavElement from "./NavElement";
import menu from "../../constants/menu";
import WizardButton from "../WizardButton/WizardButton";
import { useEffect } from "react";

let hasMetamaskOrCoinbase: boolean | undefined;

const Navbar = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      hasMetamaskOrCoinbase =
        window.ethereum?.isCoinbaseWallet || window.ethereum?.isMetaMask;
    }
  }, []);

  return (
    <nav className="2xl:flex 2xl:flex-col laptop:flex laptop:flex-col lg:flex-col md:flex-col md:flex w-full items-center z-50">
      <div className="2xl:flex 2xl:flex-row 2xl:w-full 2xl:py-5 2xl:px-12 2xl:items-center laptop:flex laptop:flex-row lg:flex-row md:flex md:flex-row md:py-5 md:px-7 md:w-full laptop:w-full laptop:py-5 laptop:px-12 laptop:items-center">
        <Link href="/" className="basis-2/12">
          <Image src={logo} alt="Logo Peronio" width={150} height={150}></Image>
        </Link>
        <div className="relative md:basis-1/2 md:ml-7">
          <ul className="2xl:basis-1/2 2xl:flex 2xl:flex-row 2xl:gap-8 2xl:items-center laptop:basis-1/2 laptop:flex laptop:flex-row laptop:gap-5 laptop:items-center md:basis-2/3 md:flex md:flex-row md:gap-10 md:items-center">
            {menu.map((item, index) => (
              <NavElement key={index} menuItem={item} />
            ))}
            <WizardButton/>
          </ul>
        </div>
          <ConnectWallet />
      </div>
      <div className="bg-[#00B7C2] 2xl:w-[95%] 2xl:h-px laptop:w-[93%] laptop:h-px md:w-[93%] md:h-px"></div>
    </nav>
  );
};

export default Navbar;
