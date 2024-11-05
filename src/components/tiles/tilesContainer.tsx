"use client";

import React, { useEffect, useState } from "react";
import { IList } from "@/utils/types/types";
import ListTile from "@/components/tiles/listTile";
import { axiosInstance as axios } from "@/app/config/axios/axios";
import { useUserContext } from "@/app/context/userContext";
import { RxCode } from "react-icons/rx";

const TilesContainer = () => {
  const { user } = useUserContext();
  const [lists, setLists] = useState<IList[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setLoading(true);

    axios.get("/lists/all").then((res) => {
      setLists(res.data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className={"flex items-center justify-center h-full animate-pulse"}>
        <RxCode size={72} />
      </div>
    );

  if (!user) {
    return <>Pro zobrazení seznamů se přihlašte.</>;
  }

  if (!lists) {
    return <>Zadání neodpovídají žádné seznamy.</>;
  }

  return lists.map((list, idx) => <ListTile listData={list} key={idx} />);
};

export default TilesContainer;
