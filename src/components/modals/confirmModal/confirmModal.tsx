"use client";

import { RxCross2 } from "react-icons/rx";
import Divider from "@/components/ui/divider/divider";
import { ReactNode, SetStateAction, useEffect, useRef } from "react";

const ConfirmModal = ({
  open,
  setOpen,
  onConfirm,
  title,
  bodyText,
  color,
  buttonText,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
  title: string;
  bodyText: ReactNode;
  color: string;
  buttonText: string;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (containerRef.current && !containerRef.current.contains(target)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mouseup", handleClickOutside);
    } else {
      document.removeEventListener("mouseup", handleClickOutside);
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const confirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <div
      className={`${open ? "flex" : "hidden"} w-screen h-screen items-center justify-center absolute top-0 left-0 z-20 bg-black/30 backdrop-blur-sm`}
    >
      <div
        ref={containerRef}
        className={"bg-white w-[450px] overflow-hidden h-fit rounded-lg"}
      >
        <header
          className={"w-full flex items-center justify-between px-6 py-4"}
        >
          <h2 className={"font-bold uppercase inline-block align-text-bottom"}>
            {title}
          </h2>
          <RxCross2
            className={"cursor-pointer mb-0.5"}
            onClick={handleClose}
            size={18}
          />
        </header>
        <Divider />
        <div className={"flex flex-col w-full p-6 pb-8"}>{bodyText}</div>
        <Divider />
        <footer
          className={"w-full flex items-center gap-4 px-6 py-4 justify-end"}
        >
          <button
            onClick={handleClose}
            className={
              "border bg-white hover:border-gray-400 rounded-md px-4 py-1 text-sm font-bold text-gray-600"
            }
          >
            Zrušit
          </button>
          <button
            onClick={confirm}
            className={`bg-${color} border-${color} text-white uppercase rounded-md px-4 py-1 text-sm font-bold`}
          >
            {buttonText}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ConfirmModal;
