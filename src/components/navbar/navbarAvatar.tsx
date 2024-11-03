"use client";

import { BsPersonCircle } from "react-icons/bs";
import { SetStateAction } from "react";

const NavbarAvatar = ({
  setOpen,
}: {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      onClick={() => setOpen(true)}
      className={
        "p-1.5 rounded-full hover:shadow-primary-light shadow-md shadow-white transition"
      }
    >
      <BsPersonCircle size={30} className={"text-foreground"} />
    </div>
  );
};

export default NavbarAvatar;
