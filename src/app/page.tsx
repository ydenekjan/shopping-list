import TilesContainer from "@/components/tiles/tilesContainer";
import Divider from "@/components/ui/divider/divider";

export default function Home() {
  return (
    <div className={"flex flex-grow justify-center w-full p-20"}>
      <div
        className={
          "w-[1000px] flex flex-col gap-4 rounded-3xl shadow-md bg-background border border p-12 relative text-foreground"
        }
      >
        <h1 className={"text-xl text-foreground uppercase font-bold"}>
          Vaše nákupní seznamy
        </h1>
        <Divider style={"mb-2"} />
        <TilesContainer />
      </div>
    </div>
  );
}
