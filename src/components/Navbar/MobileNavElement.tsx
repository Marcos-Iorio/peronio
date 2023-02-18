import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";
import { MenuItem } from "../../../types/menu";

const liVariant = {
  opened: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.25,
      ease: "easeOut"
    }
  },
  closed: {
    opacity: 0,
    y: "100%",
    transition: {
      duration: 0.25,
      ease: "easeInOut"
    }
  }
};

interface MobileNavElementProps {
  menuItem: MenuItem;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
}

const MobileNavElement = ({ menuItem, onClick }: MobileNavElementProps) => {
  const router = useRouter();
  return (
    <motion.li
      className={`py-5 text-3xl rounded-md ${
        router.pathname == "/emitir"
          ? "bg-[#00B7C2]"
          : "bg-black/5 hover:bg-black/20"
      }`}
    >
      <motion.div variants={liVariant}>
        <Link
          href={menuItem.path}
          onClick={onClick}
          className="text-white font-Abril"
        >
          {menuItem.label}
        </Link>
      </motion.div>
    </motion.li>
  );
};

export default MobileNavElement;
