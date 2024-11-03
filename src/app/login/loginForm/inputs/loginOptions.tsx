import Image from "next/image";

const LoginOptions = () => {
  const options = ["Google", "Facebook", "Microsoft", "Apple"];

  return (
    <div className={"flex w-full justify-center gap-4"}>
      {options.map((option, idx) => (
        <div
          key={idx}
          className={
            "flex justify-center items-center p-1 border border-transparent rounded-md hover:border-gray-300 hover:shadow"
          }
        >
          <Image
            src={`/${option.toLowerCase()}-logo.svg`}
            alt={`${option} Logo`}
            width={32}
            height={32}
          />
        </div>
      ))}
    </div>
  );
};

export default LoginOptions;
