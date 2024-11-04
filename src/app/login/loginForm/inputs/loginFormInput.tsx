import { ChangeEvent, HTMLInputTypeAttribute } from "react";

interface ILoginFormInput {
  label?: string;
  name?: string;
  isError: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  type?: HTMLInputTypeAttribute;
}

const LoginFormInput = ({
  icon,
  name,
  label,
  isError,
  onChange,
  type = "text",
}: ILoginFormInput) => {
  return (
    <label className={"flex flex-col text-sm gap-2"}>
      {label}
      <div
        className={`bg-background w-full flex rounded-md border pl-4 py-2 ${isError ? "border-red-500" : "focus-within:border-gray-400"}`}
      >
        <input
          className={"w-full bg-transparent outline-0"}
          name={name}
          onChange={onChange}
          type={type}
        />
        {icon}
      </div>
    </label>
  );
};

export default LoginFormInput;
