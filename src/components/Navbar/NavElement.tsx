import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";
import { MenuItem } from "../../../types/menu";

interface NavElementProps {
  menuItem: MenuItem;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
}

const NavElement = ({ menuItem, onClick }: NavElementProps) => {
  const router = useRouter();
  return (
    <li
      className={
        router.pathname === menuItem.path
          ? "bg-[#00B7C2]/90 rounded-lg p-2"
          : "hover:bg-black/10 hover:rounded-lg p-2 cursor-pointer transition-all ease-in delay-100"
      }
    >
      <Link
        href={menuItem.path}
        onClick={onClick}
        className="text-white font-Roboto"
      >
        {menuItem.label}
      </Link>
    </li>
  );
};

export default NavElement;
