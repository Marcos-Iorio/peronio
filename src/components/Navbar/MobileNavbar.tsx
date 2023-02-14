import { AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";
import { useState } from "react";

import logo from '/public/logo-white.png'
import ConnectWallet from "../ConnectWalletButton/ConnectWallet";

interface IMenu{
    onClose: (value: boolean) => void;
}

const Menu = (props: IMenu) => {
    return(
        <div onClick={() => props.onClose(false)} className="fixed w-2/4 h-full top-0 lef-0 bg-white z-50">asd</div>
    );

}

const MobileNavbar = () => {
    const [openMenu, setOpenMenu] = useState(false);

    return(
        <>
        <nav className="w-full h-20 flex flex-row justify-center items-center gap-10">
            <button type="button" onClick={() => setOpenMenu(true)}>
                <AiOutlineMenu/>
            </button>
            <div>
                <Image src={logo} alt="Peronio logo" width={100} height={50} />
            </div>
            <div>
                <ConnectWallet/>
            </div>
        </nav>
        {openMenu && <Menu onClose={setOpenMenu}/>}
        </>
        
    );
}

export default MobileNavbar;