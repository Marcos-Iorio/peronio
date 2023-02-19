import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

import {
  AiOutlineMenu,
  AiOutlineGithub,
  AiOutlineInstagram,
  AiFillTwitterCircle,
  AiFillYoutube
} from "react-icons/ai";
import { FaDiscord, FaTelegram } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";

import logo from "/public/logo-white.png";
import ConnectWallet from "../ConnectWalletButton/ConnectWallet";
import menu from "../../constants/menu";
import MobileNavElement from "./MobileNavElement";

const hideNavItemsVariant = {
  opened: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  },
  closed: {
    opacity: 1,
    y: "0%",
    transition: {
      delay: 0.5,
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const mobileMenuVariant = {
  opened: {
    y: "0%",
    transition: {
      delay: 0.15,
      duration: 0.8,
      ease: [0.74, 0, 0.19, 1.02]
    }
  },
  closed: {
    y: "-100%",
    transition: {
      delay: 0.15,
      duration: 0.33,
      ease: [0.74, 0, 0.19, 1.02]
    }
  }
};

const fadeInVariant = {
  opened: {
    opacity: 1,
    transition: {
      delay: 1
    }
  },
  closed: { opacity: 0 }
};

const ulVariant = {
  opened: {
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.18
    }
  },
  closed: {
    transition: {
      staggerChildren: 0.06,
      staggerDirection: -1
    }
  }
};

const MobileNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenuHandler = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 500);
  };

  return (
    <div className="h-full">
      <motion.nav
        initial={closed}
        animate={menuOpen ? "opened" : "closed"}
        className="flex justify-between px-3 py-3 items-center"
      >
        <div>
          <motion.button
            type="button"
            variants={hideNavItemsVariant}
            onClick={() => setMenuOpen(true)}
            className="text-white bg-[#00B7C2] rounded-full p-2"
          >
            <AiOutlineMenu className="text-white w-6 h-6" />
          </motion.button>
        </div>
        <div>
          <motion.div variants={hideNavItemsVariant}>
            <Image src={logo} alt="Peronio logo" width={100} height={50} />
          </motion.div>
        </div>
        <div>
          <motion.div variants={hideNavItemsVariant}>
            <ConnectWallet />
          </motion.div>
        </div>
        <motion.div
          variants={mobileMenuVariant}
          className="fixed top-0 left-0 h-full w-full flex flex-col items-center bg-[#1B262C] z-50 py-10 px-10 gap-10"
        >
          <motion.div
            variants={fadeInVariant}
            className="flex flex-row w-full justify-between items-center"
          >
            <div>
              <Image src={logo} alt="Peronio logo" width={100} height={50} />
            </div>
            <motion.button
              variants={fadeInVariant}
              onClick={() => setMenuOpen(false)}
              className="z-50 self-start bg-black/5 rounded-lg hover:bg-black/20 p-2"
            >
              <TfiClose className="text-white w-6 h-6" />
            </motion.button>
          </motion.div>

          <motion.ul
            variants={ulVariant}
            className="self-center w-full text-center basis-1/2 mt-14 flex flex-col gap-2"
          >
            {menu.map((item, index) => (
              <MobileNavElement
                menuItem={item}
                onClick={closeMenuHandler}
                key={index}
              />
            ))}
          </motion.ul>

          <motion.div
            variants={fadeInVariant}
            className="flex flex-row gap-6 justify-center mt-20 bg-black/5 rounded-md p-5 w-full"
          >
            <AiOutlineGithub className="h-7 w-7" />
            <AiOutlineInstagram className="h-7 w-7" />
            <AiFillTwitterCircle className="h-7 w-7" />
            <AiFillYoutube className="h-7 w-7" />
            <FaDiscord className="h-7 w-7" />
            <FaTelegram className="h-7 w-7" />
          </motion.div>
        </motion.div>
      </motion.nav>
      <div className="bg-[#00B7C2] w-[93%] mx-3 h-px"></div>
    </div>
  );
};

export default MobileNavbar;
