"use client";

import { RxCheck } from "react-icons/rx";
import { IItem, IList } from "@/utils/types/types";
import { BaseSyntheticEvent, SetStateAction, useState } from "react";
import { useParams } from "next/navigation";
import { axiosInstance as axios } from "@/app/config/axios/axios";

const ListItem = ({
  item,
  setItem,
  visible = false,
  setVisible,
  setList,
}: {
  item: IItem;
  setItem: React.Dispatch<SetStateAction<IItem>>;
  visible: boolean;
  setVisible: React.Dispatch<SetStateAction<boolean>>;
  setList: React.Dispatch<SetStateAction<IList | null>>;
}) => {
  const params = useParams();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (!item.itemName) {
      setError(true);
      return;
    }

    axios
      .post<IList>(`/lists/${params.listID}/addItem`, item)
      .then((res) => {
        if (res.status === 200) {
          setItem({
            itemName: "",
            completed: false,
          });
        }
        setList(res.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setVisible(false);
        setIsLoading(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`gap-2 items-center ${visible ? "flex" : "hidden"} ${isLoading ? "animate-pulse" : ""}`}
    >
      <input
        type={"checkbox"}
        checked={item.completed}
        onChange={() => {
          setItem((prevState) => ({
            ...prevState,
            completed: !prevState.completed,
          }));
        }}
      />
      <label
        htmlFor={`itemName`}
        className={`flex gap-2 items-center border-b ${error ? "border-red-600" : ""}`}
      >
        <input
          className={`bg-background outline-0`}
          value={item.itemName}
          onChange={(e) => {
            setItem((prevState) => ({
              ...prevState,
              itemName: e.target.value,
            }));
          }}
        />
        <button type={"submit"} className={"flex w-fit h-fit"}>
          <RxCheck className={"cursor-pointer"} size={18} />
        </button>
      </label>
    </form>
  );
};

export default ListItem;
