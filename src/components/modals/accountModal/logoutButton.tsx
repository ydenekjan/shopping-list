import { axiosInstance as axios } from "@/app/config/axios/axios";
import { useUserContext } from "@/app/context/userContext";
import { SetStateAction } from "react";

const LogoutButton = ({
  setOpen,
}: {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { setUser } = useUserContext();

  const handleLogout = () => {
    axios.post("/users/auth/logout").then(() => {
      setUser(null);
      setOpen((prev) => !prev);
    });
  };

  return (
    <button
      className={"py-2 hover:bg-slate-200 px-4 text-start"}
      onClick={handleLogout}
    >
      Odhlásit se
    </button>
  );
};

export default LogoutButton;
