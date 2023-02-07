import { ConnectWallet } from "@thirdweb-dev/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <main className='flex flex-col items-center'>
        <h1 className='mt-10 text-8xl'>Bienvenido</h1>

        <div className='mt-10'>
          <h2 className='text-4xl mb-5'>Instalado: </h2>
          <div className='flex flex-col items-center space-y-5'>
            <a href='http://thirdweb.com/'>Thirdweb</a>
            <a href='https://tailwindcss.com/'>Tailwind</a>
            <a href='https://nextjs.org/'>Nextjs</a>
          </div>
        </div>

        <div className='mt-10'>
          <ConnectWallet />
        </div>
      </main>
    </div>
  );
};

export default Home;
