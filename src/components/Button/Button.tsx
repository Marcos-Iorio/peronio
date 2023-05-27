interface IButton {
  isDisabled?: boolean;
  text: string;
  onClick?: () => void;
}

const ButtonStyles = {
  enabled:
    "rounded-xl py-2 font-Roboto font-bold laptop:text-xl mobile:text-lg bg-[#0B4D76]/30 mx-auto w-full",
  disabled:
    "rounded-xl py-2 font-Roboto font-bold laptop:text-xl mobile:text-lg bg-gray-400/20 text-gray-500 mx-auto w-full"
};

const Button = ({ isDisabled, text, onClick }: IButton) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`${isDisabled ? ButtonStyles.disabled : ButtonStyles.enabled}`}
    >
      {text}
    </button>
  );
};

export default Button;
