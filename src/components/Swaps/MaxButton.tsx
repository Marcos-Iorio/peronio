import { Dispatch, SetStateAction } from "react";

interface IMaxButton {
  setInputValue: Dispatch<SetStateAction<string>>;
  maxValue: string;
}

const MaxButton = ({ setInputValue, maxValue }: IMaxButton) => {
  return (
    <button
      onClick={() => setInputValue(maxValue)}
      className="absolute bottom-2 right-2 text-sm rounded-lg border-solid p-1 bg-[#0B4D76]/50"
    >
      MAX
    </button>
  );
};

export default MaxButton;
