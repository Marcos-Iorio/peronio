import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const WalletsModal = (props: Props) => {
  const connectMetamask = () => {
    // connectWithMetamask();
    setTimeout(() => {
      props.closeModal();
    }, 2000);
  };

  const connectCoinbase = () => {
    // connectWithCoinbase();
    setTimeout(() => {
      props.closeModal();
    }, 2000);
  };

  return (
    <>
      <Transition show={props.isOpen} as={Fragment}>
        <Dialog className='relative z-20 h-full' onClose={props.closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div
              className='fixed inset-0 bg-black/50 backdrop-blur'
              aria-hidden='true'
            />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='fixed inset-0 overflow-y-auto'>
              <div className='flex min-h-full items-center justify-center p-4'>
                <Dialog.Panel className='2xl:mx-auto 2xl:max-w-sm 2xl:rounded 2xl:bg-[#0B4D76] 2xl:border-solid 2xl:border-2 2xl:border-[#00B7C2] 2xl:p-10'>
                  <Dialog.Title className='2xl:text-white font-Roboto text-2xl pb-5'>
                    Elegí la wallet.
                  </Dialog.Title>
                  <div className='flex flex-row flex-wrap gap-10'>
                    <div
                      onClick={connectMetamask}
                      className=' 2xl:p-5 flex flex-col justify-center cursor-pointer hover:bg-[#025f99]'
                    >
                      <Image
                        src='/metamask-icon.png'
                        alt='Metamask Icon'
                        width={75}
                        height={75}
                        className='justify-self-center'
                      />
                      <p className='text-center font-Roboto'>Metamask</p>
                    </div>
                    <div
                      onClick={connectCoinbase}
                      className='2xl:p-5 flex flex-col justify-center cursor-pointer hover:bg-[#025f99]'
                    >
                      <Image
                        src='/coinbase-logo-icon.png'
                        alt='Coinbase Icon'
                        width={75}
                        height={75}
                        className='justify-self-center'
                      />
                      <p className='text-center font-Roboto'>Coinbase</p>
                    </div>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default WalletsModal;
