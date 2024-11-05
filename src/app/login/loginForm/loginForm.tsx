"use client";

import { GoEye, GoEyeClosed, GoPerson } from "react-icons/go";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { axiosInstance as axios } from "@/app/config/axios/axios";
import { useUserContext } from "@/app/context/userContext";
import { IUser } from "@/utils/types/types";
import LoginFormInput from "@/app/login/loginForm/inputs/loginFormInput";
import LoginFormCheckbox from "@/app/login/loginForm/inputs/loginFormCheckbox";
import LoginOptions from "@/app/login/loginForm/inputs/loginOptions";
import Divider from "@/components/ui/divider/divider";
import { redirect } from "next/navigation";

export interface IFormData {
  username: string;
  password: string;
  remember: boolean;
}

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useUserContext();

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (user) redirect("/");
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);

    let path = "";

    axios
      .post<IUser>("/users/auth", formData)
      .then((res) => {
        if (res.status === 201) {
          setUser(res.data);
          path = "/";
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.error(err.message);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        if (path) redirect(path);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={
        "flex flex-col gap-8 justify-center rounded-3xl bg-slate-500/10 backdrop-blur-lg border border-background p-16 relative text-foreground"
      }
    >
      <h2 className={"text-3xl"}>Přihlášení</h2>
      <LoginFormInput
        label={"Váše přihlašovací jméno"}
        name={"username"}
        icon={<GoPerson size={24} className={"mx-3"} />}
        isError={error}
        onChange={handleInput}
      />

      <div className="flex flex-col gap-3">
        <LoginFormInput
          label={"Váše Heslo"}
          name={"password"}
          isError={error}
          type={showPassword ? "text" : "password"}
          onChange={handleInput}
          icon={
            showPassword ? (
              <GoEye
                onClick={() => setShowPassword((prevState) => !prevState)}
                className={"mx-3 cursor-pointer"}
                size={24}
              />
            ) : (
              <GoEyeClosed
                onClick={() => setShowPassword((prevState) => !prevState)}
                className={"mx-3 cursor-pointer"}
                size={24}
              />
            )
          }
        />
        <div className={"flex justify-between w-full gap-20"}>
          <LoginFormCheckbox formData={formData} setFormData={setFormData} />
          <Link
            className={"transition text-sm hover:text-primary"}
            href={"/reset"}
          >
            Zapomněli jste heslo?
          </Link>
        </div>
      </div>
      <div className={"flex flex-col gap-2 items-center"}>
        <button
          disabled={!formData.username || !formData.password || loading}
          className={`${formData.username && formData.password && !loading ? "hover:bg-primary-dark" : "bg-primary-light"} transition w-full py-2 bg-primary text-white rounded-lg`}
        >
          Přihlásit se
        </button>
        <LoginOptions />
        <Divider />
        <div className={"flex flex-col gap-2 items-center w-full mt-4"}>
          <h3>Ještě nemáte účet?</h3>
          <Link
            className={
              "bg-background flex justify-center w-full py-2 border rounded-lg hover:border-gray-400 transition"
            }
            href={"/signup"}
          >
            Vytvořit účet
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
