"use client";

import { redirect, useParams } from "next/navigation";
import React, { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { axiosInstance as axios } from "@/app/config/axios/axios";
import { IItem, IList } from "@/utils/types/types";
import {
  RxCheck,
  RxCode,
  RxCross2,
  RxCrossCircled,
  RxExit,
  RxPencil1,
  RxPlus,
} from "react-icons/rx";
import dayjs from "dayjs";
import Divider from "@/components/ui/divider/divider";
import { useUserContext } from "@/app/context/userContext";
import NewMemberModal from "@/components/modals/newMemberModal/newMemberModal";
import ListItem from "@/app/detail/[listID]/items/listItem";
import NewItem from "@/app/detail/[listID]/items/newItem";
import { HiArrowUturnLeft } from "react-icons/hi2";

const Page = () => {
  const params = useParams();
  const listID = params.listID;

  const { user } = useUserContext();

  const [list, setList] = useState<IList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [newItemOpen, setNewItemOpen] = useState<boolean>(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [edit, setEdit] = useState({
    items: false,
    members: false,
  });
  const baseItem = {
    itemName: "",
    completed: false,
  };
  const [newItem, setNewItem] = useState<IItem>(baseItem);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setList(
      (prevState) =>
        ({
          ...prevState,
          [event.target.name]: event.target.value,
        }) as IList,
    );
  };

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setIsAuthor(list?.author.fullName === user?.fullName);
  }, [user, list]);

  useEffect(() => {
    axios
      .get<IList>(`/lists/${listID}`)
      .then((res) => setList(res.data))
      .catch((err) => {
        console.error(err);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!user) redirect("/");
  }, [user]);

  if (isLoading)
    return (
      <div className={"flex items-center justify-center h-full animate-pulse"}>
        <RxCode size={72} />
      </div>
    );
  if (isError) return <>Při načítání požadavku se vyskytla chyba.</>;

  return (
    <div className={"flex flex-col gap-2 w-full h-full"}>
      <div className={"items-center flex justify-between gap-12"}>
        <div className={"flex flex-col flex-grow"}>
          <div
            className={`items-center bg-background flex border-b border-transparent gap-2 text-gray-500 focus-within:text-foreground focus-within:border-gray-300 w-full`}
          >
            {isAuthor ? <RxPencil1 /> : null}

            <input
              disabled={!isAuthor}
              className={
                "w-full bg-transparent outline-0 font-bold uppercase peer"
              }
              name={"listName"}
              onChange={handleInput}
              value={list?.listName}
            />
          </div>
          <div className={"flex uppercase gap-3 text-sm items-center"}>
            <h3>{list?.author.fullName}</h3>-
            <h3>{dayjs(list?.dateCreated).format("D.M.YYYY")}</h3>
          </div>
        </div>
        <div className={"flex justify-end gap-4 items-center"}>
          {isAuthor ? (
            <RxCrossCircled
              className={"cursor-pointer"}
              size={24}
              onClick={() =>
                axios.delete(`/lists/${listID}`).finally(() => redirect("/"))
              }
            />
          ) : (
            <RxCrossCircled
              size={24}
              className={"cursor-pointer"}
              onClick={() =>
                axios
                  .post(`/lists/${listID}/leave`)
                  .finally(() => redirect("/"))
              }
            />
          )}
          <HiArrowUturnLeft
            size={22}
            className={"cursor-pointer"}
            onClick={() => redirect("/")}
          />
        </div>
      </div>
      <Divider />
      <section className={"h-full mt-2 flex gap-4"}>
        <div className={"flex-grow flex flex-col gap-2 min-w-52"}>
          <div className={"flex justify-between items-center"}>
            <div className={"flex gap-4"}>
              <h4 className={"uppercase text-sm font-bold"}>položky</h4>
              <label className="inline-flex gap-2 items-center justify-between cursor-pointer text-sm">
                Jen aktivní
                <input
                  type="checkbox"
                  onChange={() => setShowCompleted((prevState) => !prevState)}
                  name="edits"
                  checked={showCompleted}
                  className="sr-only peer"
                />
                <div className="relative w-7 h-4 bg-primary-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary-dark"></div>
                Všechny
              </label>
            </div>
            <div className={"flex gap-2 items-center"}>
              {isAuthor ? (
                <button
                  onClick={() =>
                    setEdit((prevState) => ({
                      ...prevState,
                      items: !prevState.items,
                    }))
                  }
                  className={"text-xs font-bold uppercase"}
                >
                  edit
                </button>
              ) : null}
              <RxPlus
                onClick={() => setNewItemOpen((prevState) => !prevState)}
                className={"cursor-pointer"}
                size={20}
              />
            </div>
          </div>
          <div className={"flex flex-col gap-2"}>
            {list?.items
              .filter((item) => {
                if (!showCompleted) {
                  return !item.completed;
                } else return item;
              })
              .map((item, idx) => (
                <ListItem
                  isAuthor={isAuthor}
                  setList={setList}
                  key={idx}
                  itemData={item}
                  edit={edit.items}
                />
              ))}
            <NewItem
              visible={newItemOpen}
              setVisible={setNewItemOpen}
              item={newItem}
              setItem={setNewItem}
              setList={setList}
            />
          </div>
        </div>
        <Divider orientation={"vertical"} />
        <div className={"w-52 flex flex-col gap-2"}>
          <div className={"flex justify-between items-center"}>
            <h4 className={"uppercase text-sm font-bold "}>členové</h4>
            <div className={"flex gap-2 items-center"}>
              {isAuthor ? (
                <>
                  <button
                    onClick={() =>
                      setEdit((prevState) => ({
                        ...prevState,
                        members: !prevState.members,
                      }))
                    }
                    className={"text-xs font-bold uppercase"}
                  >
                    edit
                  </button>
                  <RxPlus
                    className={"cursor-pointer"}
                    onClick={() => setModalOpen(true)}
                    size={20}
                  />
                </>
              ) : null}
            </div>
          </div>
          {list?.members.map((member, idx) => (
            <div className={"flex justify-between items-center"} key={idx}>
              {member.user.fullName}
              {edit.members ? (
                <RxCross2
                  onClick={() =>
                    axios
                      .post<IList>(`/lists/${listID}/removeMember`, member.user)
                      .then((res) => setList(res.data))
                  }
                  className={"cursor-pointer"}
                />
              ) : null}
            </div>
          ))}
        </div>
      </section>
      <NewMemberModal
        setList={setList as React.Dispatch<SetStateAction<IList>>}
        open={modalOpen}
        setOpen={setModalOpen}
      />
    </div>
  );
};

export default Page;
