import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { IFormData } from "@/app/login/loginForm/loginForm";

interface IState {
  formData: IFormData;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

const LoginFormCheckbox = ({ formData, setFormData }: IState) => {
  return (
    <label
      className={"flex gap-2 text-sm relative items-center cursor-pointer"}
    >
      <div
        className={`flex items-center justify-center aspect-square border rounded-md ${formData.remember ? "bg-primary border-primary" : ""}`}
      >
        <input
          type={"checkbox"}
          onChange={() =>
            setFormData({ ...formData, remember: !formData.remember })
          }
          className={"opacity-0 absolute left-0 top-1/2 -translate-y-1/2"}
        />
        <IoMdCheckmark
          className={`opacity-${formData.remember ? "100" : "0"}`}
          size={16}
          color={"white"}
        />
      </div>
      Zapamatovat
    </label>
  );
};

export default LoginFormCheckbox;
