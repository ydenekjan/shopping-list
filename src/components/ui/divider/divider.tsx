const Divider = ({
  orientation = "horizontal",
  style,
}: {
  orientation?: "vertical" | "horizontal";
  style?: string;
}) => {
  const ori =
    orientation === "horizontal" ? "w-full h-[1px]" : "h-full w-[1px]";

  return <div className={`bg-gray-300 ${ori} ${style}`} />;
};

export default Divider;
