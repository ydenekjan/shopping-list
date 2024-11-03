import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className={"uppercase text-xl text-foreground font-bold"}>
      nákupák
    </Link>
  );
};

export default Logo;
