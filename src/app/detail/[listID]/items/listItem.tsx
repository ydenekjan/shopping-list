"use client";

import { RxCheck, RxCross2 } from "react-icons/rx";
import { IItem, IList } from "@/utils/types/types";
import { axiosInstance as axios } from "@/app/config/axios/axios";
import { useParams } from "next/navigation";
import { BaseSyntheticEvent, SetStateAction, useEffect, useState } from "react";

const ListItem = ({
  itemData,
  setList,
  edit,
  isAuthor,
}: {
  itemData: IItem;
  edit: boolean;
  setList: React.Dispatch<SetStateAction<IList | null>>;
  isAuthor: boolean;
}) => {
  const params = useParams();
  const listID = params.listID;
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState(itemData);

  const postUpdate = (event?: BaseSyntheticEvent) => {
    event?.preventDefault();
    setIsLoading(true);

    axios
      .post(`/lists/${listID}/updateItem?id=${item._id}`, item)
      .then((res) => {
        setList(res.data);
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!isAuthor) {
      postUpdate();
    }
  }, [item.completed]);

  useEffect(() => {
    setItem(itemData);
  }, [itemData]);

  console.log(item);

  return (
    <form
      onSubmit={postUpdate}
      className={`gap-2 flex items-center ${isLoading ? "pointer-events-none animate-pulse" : ""}`}
    >
      {edit ? (
        <RxCross2
          className={"cursor-pointer"}
          onClick={() => {
            setIsLoading(true);
            console.log(item._id);
            axios
              .post<IList>(`/lists/${listID}/removeItem?itemId=${item._id}`)
              .then((res) => setList(res.data))
              .finally(() => setIsLoading(false));
          }}
          size={18}
        />
      ) : null}
      <label className={"flex gap-2"}>
        <input
          disabled={!edit && isAuthor}
          type={"checkbox"}
          checked={item.completed}
          onChange={() =>
            setItem((prevState) => ({
              ...prevState,
              completed: !prevState.completed,
            }))
          }
        />
      </label>
      <div className={`flex gap-2 items-center`}>
        <input
          className={`outline-0 bg-background border px-2 rounded-md ${!edit ? "border-transparent" : ""}`}
          disabled={!edit}
          value={item.itemName}
          onChange={(event: BaseSyntheticEvent) =>
            setItem((prevState) => ({
              ...prevState,
              itemName: event.target.value,
            }))
          }
        />
        {edit ? (
          <button>
            <RxCheck />
          </button>
        ) : null}
      </div>
    </form>
  );
};

export default ListItem;
