"use client";

import { RxCross2 } from "react-icons/rx";
import Divider from "@/components/ui/divider/divider";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { axiosInstance } from "@/app/config/axios/axios";
import { redirect } from "next/navigation";
import { IList } from "@/utils/types/types";

const NewMemberModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [listName, setListName] = useState<string>("");

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
    setListName("");
    setOpen(false);
  };

  const handleSubmit = () => {
    axiosInstance.post<IList>("/lists", { listName: listName }).then((res) => {
      if (res.data._id) redirect("/detail/" + res.data._id);
    });
  };

  return (
    <div
      className={`${open ? "flex" : "hidden"} w-screen h-screen items-center justify-center absolute top-0 left-0 right-0 bottom-0 z-20 bg-black/30 backdrop-blur-sm`}
    >
      <div ref={containerRef} className={"bg-white w-[450px] h-fit rounded-lg"}>
        <header
          className={"w-full flex items-center justify-between px-6 py-4"}
        >
          <h2 className={"font-bold uppercase inline-block align-text-bottom"}>
            Vytvořit nový seznam
          </h2>
          <RxCross2
            className={"cursor-pointer mb-0.5"}
            onClick={handleClose}
            size={18}
          />
        </header>
        <Divider />
        <div className={"flex flex-col w-full p-6 pb-8"}>
          <label className={"flex flex-col gap-1"}>
            Název seznamu
            <input
              className={"outline-0 border rounded-md px-2 py-0.5"}
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
          </label>
        </div>
        <Divider />
        <footer
          className={"w-full flex items-center gap-4 px-6 py-4 justify-end"}
        >
          <button
            onClick={handleClose}
            className={
              "border hover:border-gray-400 rounded-md px-4 py-1 text-sm font-bold text-gray-600"
            }
          >
            Zrušit
          </button>
          <button
            onClick={handleSubmit}
            disabled={!listName}
            className={`${!listName ? "bg-primary-light border-primary-light" : "bg-primary border-primary hover:bg-primary-dark hover:border-primary-dark"} border text-white rounded-md px-4 py-1 text-sm font-bold`}
          >
            Vytvořit
          </button>
        </footer>
      </div>
    </div>
  );
};

export default NewMemberModal;
