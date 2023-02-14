import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface Props {
  modalName: string;
  isOpen: boolean;
  setModal: (value: boolean) => void;
  title: string;
  text: string;
}

const Modal = (props: Props) => {
  const closeModal = () => {
    props.setModal(false);
  };

  return (
    <Transition show={props.isOpen} as={Fragment}>
      <Dialog className="relative z-20 h-full" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur"
            aria-hidden="true"
          />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel className="2xl:mx-auto 2xl:max-w-sm 2xl:rounded-lg 2xl:bg-[#0B4D76] 2xl:p-10">
                <Dialog.Title className="2xl:text-white font-Abril text-2xl pb-5">
                  {props.title}
                </Dialog.Title>
                <p className="font-Roboto">{props.text}</p>
                <button
                  className="w-full rounded-md bg-[#FDCC9F] text-[#0B4D76] font-bold p-2 shadow-modal-button hover:shadow-modal-button-hover transition-all delay-100 ease-in-out"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
