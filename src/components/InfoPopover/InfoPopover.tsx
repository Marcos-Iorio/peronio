import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

import * as Icon from "react-icons/ai";
import { IconContext } from "react-icons";

type direction = "TOP" | "BOTTOM";

interface IInfoPopover {
  ydirection?: direction;
  title: string;
  text: string;
  sm?: boolean;
}

const directions = {
  top: "bottom-8",
  bottom: "top-10"
};

const InfoPopover = ({ title, text, sm, ydirection }: IInfoPopover) => {
  if (sm) {
    return (
      <Popover className="relative">
        <Popover.Button className="text-sm font-Roboto rounded-full bg-[#00B7C2] w-4 h-4 text-center hover:bg-transparent hover:border-[#00B7C2] hover:border-solid hover:border">
          ?
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            className={`${
              ydirection == "TOP" ? directions.top : directions.bottom
            } absolute bottom-8 laptop:left-0  mobile:-left-10 z-50 bg-[#00B7C2] border-solid border-2 border-black/70 rounded-md  laptop:min-w-[20rem] mobile:min-w-[15rem] p-5`}
          >
            {({ close }) => (
              <div className="flex flex-col relative">
                <button
                  onClick={() => close()}
                  className="absolute -right-2 -top-2 font-normal font-Robot text-sm"
                >
                  <Icon.AiOutlineClose
                    className=" laptop:w-5 laptop:h-5 mobile:h-7 mobile:w-7"
                    style={{ color: "white" }}
                  />
                </button>
                <h2 className="font-Abril text-md font-normal mb-4">{title}</h2>
                <p className="font-Roboto text-[14px]">{text}</p>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    );
  }

  return (
    <Popover className="relative z-50 inline-flex max-w-full">
      <Popover.Button className="text-lg font-Roboto rounded-full bg-[#00B7C2] w-7 h-7 text-center hover:bg-transparent hover:border-[#00B7C2] hover:border-solid hover:border">
        ?
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute top-10 laptop:right-0 mobile:-right-8 z-50 bg-[#00B7C2] rounded-md shrink-0 laptop:min-w-[23rem] p-5">
          {({ close }) => (
            <div className="flex flex-col relative">
              <button
                onClick={() => close()}
                className="absolute -right-2 -top-2 font-normal font-Robot"
              >
                <Icon.AiOutlineClose
                  className=" laptop:w-5 laptop:h-5 mobile:h-7 mobile:w-7"
                  style={{ color: "white" }}
                />
              </button>
              <h2 className="font-Abril text-md font-normal mb-4">{title}</h2>
              <p className="font-Roboto text-[16px] w-full">{text}</p>
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default InfoPopover;
