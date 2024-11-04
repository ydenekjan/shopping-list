"use client";

import { IList } from "@/utils/types/types";
import dayjs from "dayjs";
import Divider from "@/components/ui/divider/divider";
import { RxArrowRight, RxCross2 } from "react-icons/rx";
import { redirect } from "next/navigation";

const ListTile = ({ listData }: { listData: IList }) => {
  const { listName, author, items, isArchived, members, dateCreated, _id } =
    listData;

  console.log();

  return (
    <div
      className={`shadow cursor-default w-full rounded-md border flex flex-col relative ${!isArchived ? "bg-white text-foreground" : "bg-gray-300 text-gray-500"}`}
    >
      <section className={"flex items-center justify-between p-3 pb-2"}>
        <div className={"flex gap-4"}>
          <h2 className={"uppercase font-bold"}>{listName}</h2>
          <h3>
            {author} - {dayjs(dateCreated).format("D.M.YYYY")}
          </h3>
        </div>
        <div className={"flex gap-2 items-center pr-2"}>
          <RxCross2 size={20} className={"cursor-pointer"} />
          <RxArrowRight
            size={20}
            className={"cursor-pointer"}
            onClick={() => redirect(`/detail/${_id}`)}
          />
        </div>
      </section>
      <Divider />
      <section className={"flex"}>
        <div className={"flex flex-col gap-2 w-min p-3 "}>
          <h4 className={"text-sm font-bold uppercase w-fit"}>položky</h4>
          <h4 className={"text-sm font-bold uppercase w-fit"}>členové</h4>
        </div>
        <Divider orientation={"vertical"} />
        <div className={"flex flex-col p-3"}>
          <p className={"h-1/2 items-center flex"}>
            {items.map((item, idx) => (
              <a className={"text-sm border px-1.5 rounded-md"} key={idx}>
                {item.itemName}
              </a>
            ))}
          </p>
          <p className={"h-1/2 items-center flex"}>
            {members.map((member, idx) => (
              <a className={"text-sm border px-1.5 rounded-md"} key={idx}>
                {member}
              </a>
            ))}
          </p>
        </div>
      </section>
    </div>
  );
};

export default ListTile;
