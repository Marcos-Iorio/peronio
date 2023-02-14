import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

import {
  AiOutlineMenu,
  AiOutlineGithub,
  AiOutlineInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
import { FaDiscord, FaTelegram } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";

import logo from "/public/logo-white.png";
import ConnectWallet from "../ConnectWalletButton/ConnectWallet";
import Link from "next/link";

const hideNavItemsVariant = {
  opened: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  closed: {
    opacity: 1,
    y: "0%",
    transition: {
      delay: 1.1,
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const mobileMenuVariant = {
  opened: {
    y: "0%",
    transition: {
      delay: 0.15,
      duration: 1.1,
      ease: [0.74, 0, 0.19, 1.02],
    },
  },
  closed: {
    y: "-100%",
    transition: {
      delay: 0.35,
      duration: 0.63,
      ease: [0.74, 0, 0.19, 1.02],
    },
  },
};

const fadeInVariant = {
  opened: {
    opacity: 1,
    transition: {
      delay: 1.2,
    },
  },
  closed: { opacity: 0 },
};

const ulVariant = {
  opened: {
    transition: {
      delayChildren: 1,
      staggerChildren: 0.18,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.06,
      staggerDirection: -1,
    },
  },
};

const liVariant = {
  opened: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
  closed: {
    opacity: 0,
    y: "100%",
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};

const fadeInStart = { opacity: 0 };
const fadeInEnd = { opacity: 1 };
const fadeInTransition = { duration: 1 };

const MobileNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="h-full overflow-y-hidde">
      <motion.nav
        initial={closed}
        animate={menuOpen ? "opened" : "closed"}
        className="flex justify-between px-10 py-3"
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
            className="flex flex-row w-full justify-between"
          >
            <div>
              <Image src={logo} alt="Peronio logo" width={100} height={50} />
            </div>
            <motion.button
              variants={fadeInVariant}
              onClick={() => setMenuOpen(false)}
              className="z-50 self-end"
            >
              <TfiClose className="text-white w-6 h-6" />
            </motion.button>
          </motion.div>

          <motion.ul
            variants={ulVariant}
            className="self-center w-full text-center basis-1/2 mt-14 flex flex-col gap-2"
          >
            <motion.li className="py-5 text-3xl bg-black/5 rounded-md hover:bg-black/20">
              <motion.div variants={liVariant}>
                <Link href="/emitir" className="text-white font-Abril">
                  Emitir
                </Link>
              </motion.div>
            </motion.li>
            <motion.li className="py-5 text-3xl bg-black/5 rounded-md hover:bg-black/20">
              <motion.div variants={liVariant}>
                <Link href="/retirar" className="text-white font-Abril">
                  Retirar
                </Link>
              </motion.div>
            </motion.li>
            <motion.li className="py-5 text-3xl bg-black/5 rounded-md hover:bg-black/20">
              <motion.div variants={liVariant}>
                <Link href="/migrar" className="text-white font-Abril">
                  Migrar
                </Link>
              </motion.div>
            </motion.li>
            <motion.li className="py-5 text-3xl bg-black/5 rounded-md hover:bg-black/20">
              <motion.div variants={liVariant}>
                <Link href="/exchange" className="text-white font-Abril">
                  Exchange
                </Link>
              </motion.div>
            </motion.li>
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
    </main>
  );
};

export default MobileNavbar;
