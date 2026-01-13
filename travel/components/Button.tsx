import Image from "next/image";

type ButtonProps = {
  type: "button" | "submit";
  title: string;
  icon?: string;
  variant: string;
  full?: boolean;
};

const Button = ({ type, title, icon, variant, full }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center gap-3 rounded-full border ${variant} ${
        full ? "w-full" : ""
      }`}
    >
      {icon && <Image src={icon} alt={title} width={24} height={24} />}

      <span className="text-md font-bold whitespace-nowrap cursor-pointer">
        {title}
      </span>
    </button>
  );
};

export default Button;
