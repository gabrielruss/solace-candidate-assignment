interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  text: string;
  disabled?: boolean;
}

export default function Button({
  onClick,
  text,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className="text-white rounded-lg bg-primary min-w-24 h-10 p-2"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
