import { BsPersonCircle } from "react-icons/bs";
import Link from "next/link";
import LogoutButton from "@/components/modals/accountModal/logoutButton";
import { useUserContext } from "@/app/context/userContext";
import { useEffect, useRef } from "react";

interface IState {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountModal = ({ open, setOpen }: IState) => {
  const { user } = useUserContext();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (containerRef.current && !containerRef.current.contains(target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener to detect clicks
    document.addEventListener("mouseup", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${open ? "flex" : "hidden"} shadow-lg absolute bg-background flex flex-col top-[95%] right-4 text-gray-700 z-10 rounded-sm border border-gray-200 py-2`}
    >
      <div className="flex flex-col px-4">
        <h2 className={"text-sm font-bold"}>Účet</h2>
        <div className={"flex items-center"}>
          <BsPersonCircle size={"36"} />
          <div className={"flex flex-col p-2 gap-1 text-sm"}>
            {user?.fullName}
            <p className={"text-xs"}>{user?.email}</p>
          </div>
        </div>
      </div>
      <div className={"h-[1px] bg-gray-300 my-2"} />

      <Link className={"py-2 hover:bg-slate-200 px-4 w-full"} href={"/account"}>
        Nastavení účtu
      </Link>
      <LogoutButton setOpen={setOpen} />
    </div>
  );
};

export default AccountModal;
