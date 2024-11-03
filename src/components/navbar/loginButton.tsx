import Link from "next/link";

const LoginButton = () => {
  return (
    <Link
      className={
        "rounded-md bg-primary hover:bg-primary-dark transition text-white font-bold px-4 py-1"
      }
      href={"/login"}
    >
      Login
    </Link>
  );
};

export default LoginButton;
