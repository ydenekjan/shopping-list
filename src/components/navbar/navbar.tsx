"use client";

import NavbarAvatar from "@/components/navbar/navbarAvatar";
import Logo from "@/components/navbar/logo";
import LoginButton from "@/components/navbar/loginButton";
import AccountModal from "@/components/modals/accountModal/accountModal";
import { useState } from "react";
import { useUserContext } from "@/app/context/userContext";

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useUserContext();

  return (
    <div
      className={
        "w-full flex justify-between items-center px-8 relative bg-white min-h-16 shadow-md"
      }
    >
      <Logo />
      {user ? <NavbarAvatar setOpen={setModalOpen} /> : <LoginButton />}
      <AccountModal open={modalOpen} setOpen={setModalOpen} />
    </div>
  );
};

export default Navbar;
