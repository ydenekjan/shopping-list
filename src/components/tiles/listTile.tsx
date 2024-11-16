"use client";

import { IList } from "@/utils/types/types";
import dayjs from "dayjs";
import Divider from "@/components/ui/divider/divider";
import { RxArrowRight, RxCross2, RxCrossCircled } from "react-icons/rx";
import { redirect } from "next/navigation";
import { useUserContext } from "@/app/context/userContext";
import { axiosInstance as axios } from "@/app/config/axios/axios";
import { SetStateAction, useState } from "react";
import ConfirmModal from "@/components/modals/confirmModal/confirmModal";

const ListTile = ({
  listData,
  setLists,
}: {
  listData: IList;
  setLists: React.Dispatch<SetStateAction<IList[] | null>>;
}) => {
  const { listName, author, items, archived, members, dateCreated, _id } =
    listData;

  const { user } = useUserContext();
  const [modalOpen, setModalOpen] = useState(false);
  const isAuthor = author.fullName === user?.fullName;

  const handleDeleteList = () => {
    axios
      .delete(`/lists/${listData._id}`)
      .then(() => axios.get(`/lists/all`).then((res) => setLists(res.data)));
  };

  return (
    <div>
      <div
        className={`shadow cursor-default w-full rounded-md border flex flex-col relative ${!archived ? "bg-slate-50 text-foreground" : "opacity-60"}`}
      >
        <section className={"flex items-center justify-between p-3 pb-2"}>
          <div className={"flex gap-4"}>
            <h2 className={"uppercase font-bold"}>{listName}</h2>
            <h3>
              {author.fullName} - {dayjs(dateCreated).format("D.M.YYYY")}
            </h3>
          </div>
          <div className={"flex gap-2 items-center pr-2"}>
            {isAuthor ? (
              <RxCrossCircled
                className={"cursor-pointer"}
                size={24}
                onClick={() => setModalOpen(true)}
              />
            ) : (
              <RxCross2
                className={"cursor-pointer"}
                size={24}
                onClick={() =>
                  axios
                    .post(`/lists/${listData._id}/leave`)
                    .then((res) => setLists(res.data))
                }
              />
            )}
            <RxArrowRight
              size={20}
              className={"cursor-pointer"}
              onClick={() => redirect(`/detail/${_id}`)}
            />
          </div>
        </section>
        <Divider />
        <section
          className={
            "grid grid-cols-[auto_auto_1fr] gap-x-4 h-fit pl-4 grid-rows-[1rem_auto_1rem_auto_1rem]"
          }
        >
          <h4
            className={
              "flex text-sm font-bold uppercase w-fit row-start-2 row-end-3 justify-center items-center"
            }
          >
            položky
          </h4>
          <h4
            className={
              "flex text-sm font-bold uppercase row-start-4 row-end-4 items-center justify-center w-full"
            }
          >
            členové
          </h4>
          <div className={"flex row-start-1 row-end-6"}>
            <Divider orientation={"vertical"} />
          </div>
          <p className={"h-full flex row-start-2 row-end-3 items-center gap-2"}>
            {items.map((item, idx) => (
              <a className={"text-sm border px-1.5 rounded-md"} key={idx}>
                {item.itemName}
              </a>
            ))}
          </p>
          <p className={"h-fit items-center flex row-start-4 row-end-5 gap-2"}>
            {members.map((member, idx) => {
              return (
                <a className={"text-sm border px-1.5 rounded-md"} key={idx}>
                  {member.user.fullName}
                </a>
              );
            })}
          </p>
        </section>
      </div>
      <ConfirmModal
        open={modalOpen}
        setOpen={setModalOpen}
        // setOpen={setModalOpen}
        color={"red-600"}
        title={"Smazat seznam"}
        bodyText={
          <p>
            Opravdu si přejete smazat seznam <strong>{listName}</strong>? Tato
            akce je nevratná.
          </p>
        }
        onConfirm={handleDeleteList}
        buttonText={"smazat"}
      />
    </div>
  );
};

export default ListTile;
