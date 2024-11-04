"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { List } from "postcss/lib/list";

const Page = () => {
  const params = useParams();
  const listID = params.listID;

  const [list, setList] = useState<List | null>(null);

  return <div></div>;
};

export default Page;
