const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={"flex flex-grow justify-center w-full p-20"}>
      <div
        className={
          "w-[1000px] flex flex-col gap-4 rounded-3xl shadow-md bg-background border p-12 text-foreground"
        }
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
