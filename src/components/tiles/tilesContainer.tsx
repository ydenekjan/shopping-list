"use client";

import { useEffect, useState } from "react";
import { IList } from "@/utils/types/types";
import ListTile from "@/components/tiles/listTile";
import { axiosInstance as axios } from "@/app/config/axios/axios";
import { useUserContext } from "@/app/context/userContext";

const TilesContainer = () => {
  const { user } = useUserContext();
  const [lists, setLists] = useState<IList[] | null>(null);

  useEffect(() => {
    if (!user) return;
    axios.get("/lists/all").then((res) => setLists(res.data));
  }, []);

  console.log(lists);

  return (
    <div className={"flex flex-col gap-4"}>
      {user ? (
        lists ? (
          lists.map((list, idx) => <ListTile listData={list} key={idx} />)
        ) : (
          <>Zadání neodpovídají žádné seznamy.</>
        )
      ) : (
        <>Pro zobrazení seznamů se přihlašte.</>
      )}
    </div>
  );
};

export default TilesContainer;
