const Divider = ({
  orientation = "horizontal",
}: {
  orientation?: "vertical" | "horizontal";
}) => {
  const style =
    orientation === "horizontal" ? "w-full h-[1px]" : "h-full w-[1px]";

  return <div className={`my-2 bg-gray-300 ${style}`} />;
};

export default Divider;
