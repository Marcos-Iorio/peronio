import Image from "next/image";
import Link from "next/link";

import * as Icon from "react-icons/bs";

import logo from "/public/logo-white.png";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-3 w-full h-full">
      <div className="bg-[#00B7C2] 2xl:w-[95%] laptop:mx-auto 2xl:h-px laptop:w-[93%] laptop:h-px md:w-[93%] mobile:w-[93%] mobile:mx-3 mobile:h-px md:h-px"></div>
      <div className="flex laptop:flex-row mobile:flex-col gap-5 w-full laptop:justify-evenly py-10 px-16 h-full">
        <div className="flex flex-col gap-3">
          <Image src={logo} height={150} width={150} alt="Logo Peronio" />
          <div className="flex flex-row gap-4 py-3">
            <Link href="">
              <Icon.BsTwitter className="w-5 h-auto text-[#00B7C2]" />
            </Link>
            <Link href="">
              <Icon.BsTelegram className="w-5 h-auto text-[#00B7C2]" />
            </Link>
            <Link href="">
              <Icon.BsInstagram className="w-5 h-auto text-[#00B7C2]" />
            </Link>
            <Link href="">
              <Icon.BsGithub className="w-5 h-auto text-[#00B7C2]" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-Roboto font-bold text-xl text-[#00B7C2]">
            Desarrolladores
          </p>
          <Link
            href={"https://github.com/peronio-ar"}
            target="_blank"
            rel="noreferrer"
            className="font-Roboto text-white text-lg hover:underline"
          >
            Github
          </Link>
          <Link
            href={"https://docs.peronio.ar/"}
            target="_blank"
            rel="noreferrer"
            className="font-Roboto text-white text-lg hover:underline"
          >
            Documentación
          </Link>
          <Link
            href={"https://docs.peronio.ar/crypto/auditorias"}
            target="_blank"
            rel="noreferrer"
            className="font-Roboto text-white text-lg hover:underline"
          >
            Auditorías
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-Roboto font-bold text-xl text-[#00B7C2]">Ayuda</p>
          <Link
            href={"https://discord.peronio.ar"}
            target="_blank"
            rel="noreferrer"
            className="font-Roboto text-white text-lg hover:underline"
          >
            Discord
          </Link>
          <Link
            href={"https://t.me/peronioar"}
            target="_blank"
            rel="noreferrer"
            className="font-Roboto text-white text-lg hover:underline"
          >
            Telegram
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-Roboto font-bold text-xl text-[#00B7C2]">
            Acerca de
          </p>
          <Link
            href={
              "hhttps://docs.google.com/forms/d/e/1FAIpQLScCugMNil6Y4SCqUthOuchA6sAN1vCKBRFFL2ieVviYBRleBg/viewform"
            }
            target="_blank"
            rel="noreferrer"
            className="font-Roboto text-white text-lg hover:underline"
          >
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
