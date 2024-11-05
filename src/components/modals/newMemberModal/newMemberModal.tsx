"use client";

import { RxCross2 } from "react-icons/rx";
import Divider from "@/components/ui/divider/divider";
import {
  BaseSyntheticEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { axiosInstance as axios } from "@/app/config/axios/axios";
import { useParams } from "next/navigation";
import { IList } from "@/utils/types/types";

const NewMemberModal = ({
  open,
  setOpen,
  setList,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setList: React.Dispatch<SetStateAction<IList>>;
}) => {
  const params = useParams();
  const [error, setError] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (containerRef.current && !containerRef.current.contains(target)) {
      handleClose();
    }
  };

  const baseData = {
    email: "",
    permissions: {
      members: false,
      edits: false,
    },
  };

  const [formData, setFormData] = useState(baseData);

  useEffect(() => {
    if (open) {
      document.addEventListener("mouseup", handleClickOutside);
    } else {
      document.removeEventListener("mouseup", handleClickOutside);
    }
  }, [open]);

  const handleInput = (event: BaseSyntheticEvent) => {
    const name = event.target.name as "edits" | "members" | "email";
    const value = event.target.value;

    if (name === "edits" || name === "members") {
      setFormData((prevState) => ({
        ...prevState,
        permissions: {
          ...prevState.permissions,
          [name]: !prevState.permissions[name],
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleClose = () => {
    setFormData(baseData);
    setError("");
    setOpen(false);
  };

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();

    axios
      .post<IList>(`/lists/${params.listID}/addMember`, formData)
      .then((res) => {
        if (res.status === 200) {
          handleClose();
          setList(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.status === 400) {
          setError("member");
        } else {
          setError("nonexistent");
        }
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
            Přidat nového člena
          </h2>
          <RxCross2
            className={"cursor-pointer mb-0.5"}
            onClick={handleClose}
            size={18}
          />
        </header>
        <Divider />
        <form
          onSubmit={handleSubmit}
          className={"px-6 py-4 flex flex-col gap-4"}
        >
          <label className={"flex flex-col"}>
            Email
            <input
              type={"email"}
              name={"email"}
              onChange={handleInput}
              value={formData.email}
              className={`${error ? "border-red-600" : "focus:border-gray-400"} px-2 py-0.5 rounded-md border outline-0`}
            />
            <div
              className={`text-xs text-red-600 ${error ? "opacity-100" : "opacity-0"}`}
            >
              {error === "nonexistent"
                ? "Tento uživatel neexistuje"
                : "Tento uživatel je již členem"}
            </div>
          </label>
          <h3 className={"font-bold text-sm text-gray-600"}>Oprávnění</h3>
          <label className="inline-flex items-center justify-between cursor-pointer text-sm">
            <div className={"flex-col"}>
              <h4 className={"font-bold"}>Členové</h4>
              Může přidat nové a odebrat stávající členy
            </div>
            <input
              type="checkbox"
              onChange={handleInput}
              name="members"
              checked={formData.permissions.members}
              className="sr-only peer"
            />
            <div className="relative w-9 h-5 bg-primary-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-dark"></div>
          </label>
          <label className="inline-flex items-center justify-between cursor-pointer text-sm">
            <div className={"flex-col"}>
              <h4 className={"font-bold"}>Úpravy</h4>
              Může mazat položky a změnit název seznamu
            </div>
            <input
              type="checkbox"
              onChange={handleInput}
              name="edits"
              checked={formData.permissions.edits}
              className="sr-only peer"
            />
            <div className="relative w-9 h-5 bg-primary-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-dark"></div>
          </label>
        </form>
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
            disabled={!formData.email}
            className={`${!formData.email ? "bg-primary-light border-primary-light" : "bg-primary border-primary hover:bg-primary-dark hover:border-primary-dark"} border text-white rounded-md px-4 py-1 text-sm font-bold`}
          >
            Přidat
          </button>
        </footer>
      </div>
    </div>
  );
};

export default NewMemberModal;
