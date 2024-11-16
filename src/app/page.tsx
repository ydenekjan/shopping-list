"use client";

import TilesContainer from "@/components/tiles/tilesContainer";
import Divider from "@/components/ui/divider/divider";
import { RxPlus } from "react-icons/rx";
import NewListModal from "@/components/modals/newListModal/newListModal";
import { useState } from "react";
import { useUserContext } from "@/app/context/userContext";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const { user } = useUserContext();

  return (
    <div className={"flex flex-grow justify-center w-full p-20"}>
      <div
        className={
          "w-[1000px] flex flex-col gap-4 rounded-3xl shadow-md bg-background border p-12 text-foreground"
        }
      >
        <div className={"flex w-full justify-between"}>
          <div className={"flex flex-col gap-2 items-start"}>
            <h1 className={"text-xl text-foreground uppercase font-bold"}>
              Vaše nákupní seznamy
            </h1>
            <label className={"flex items-baseline gap-2"}>
              <input
                type={"checkbox"}
                checked={showArchived}
                onChange={() => setShowArchived(!showArchived)}
              />
              Zobrazit archivované seznamy
            </label>
          </div>
          {user ? (
            <RxPlus size={28} onClick={() => setModalOpen(true)} />
          ) : null}
        </div>
        <Divider style={"mb-2"} />
        <div className={"flex flex-col gap-4"}>
          <TilesContainer showArchived={showArchived} />
        </div>
      </div>
      <NewListModal open={modalOpen} setOpen={setModalOpen} />
    </div>
  );
}
