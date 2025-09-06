import React, { useContext } from "react";
import { Input, Button, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginApi } from "../Services/authServices.js";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginSchema } from "../Schema/LoginSchema.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { authContext } from "../Context/authcontex.jsx";


export default function LoginPage() {
  const [isLoding, setIsLoding] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [succssMessage, setSuccssMessage] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(authContext);
  const getEmailFromLocalStorage = () => {
    return localStorage.getItem("userEmail") || ""; // لو مفيش إيميل، رجّع نص فاضي
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: getEmailFromLocalStorage(),
      password: "",
    },

    resolver: zodResolver(LoginSchema),
  });

  async function handelLogin(formdata) {
    setIsLoding(true);
    const data = await loginApi(formdata);
    setIsLoding(false);
    if (data.message == "success") {
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      reset();
      navigate("/");
    } else {
      setErrorMessage(data.errors);
    }
    console.log(data.errorMessage);
  }

  return (
    <div
      style={{
        backgroundImage:
          "radial-gradient(circle at center,   #1eae98  0%,#09203f 50%   ,   #1eae98  100%)",
      }}
      className="relative py-10 animate-scale-pulse min-h-screen flex items-center justify-center"
    >
      <div className="container max-w-sm sm:max-w-md lg:max-w-lg px-3  py-2 my-2 mx-auto rounded-xl shadow-xl border-1 border-stone-200    ">
        <form onSubmit={handleSubmit(handelLogin)} className="text-white">
          <div className=" flex justify-center">
            <FontAwesomeIcon
              icon={faUser}
              className="text-2xl rounded-full bg-stone-300 p-4 lg:text-sky-950 text-sky-800 "
            />
          </div>
          <div className="">
            <h1 className="text-center text-shadow-xl text-sky-950  m-5 text-3xl">
              Login
            </h1>
            <p className="   text-center">
              And contact with{" "}
              <span className="text-3xl  lg:text-sky-950 text-sky-800">Friends</span>
            </p>
          </div>

          <div className=" flex flex-col gap-6 p-5 text-white">
            <div className="relative ">
                        
              <Input
                isInvalid={Boolean(errors.email?.message)}
                errorMessage={errors.email?.message}
                variant="bordered"
                label="Email"

                type="email"
                className="w-full pl-3 text-stone-300 border-stone-200 "

                {...register("email")}
              />

              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="h-5 w-5 "
                >
                  <path
                    className="lg:fill-sky-950 fill-sky-800"
                    d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"
                  />
                </svg>
              </div>
            </div>

            <div className="relative ">
              <Input
                isInvalid={Boolean(errors.password?.message)}
                errorMessage={errors.password?.message}
                variant="bordered"
                label="Password"
                className="w-full pl-3"
                type="password"
                {...register("password")}
              />

              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="h-5 w-5 "
                >
                  <path
                    className="lg:fill-sky-950 fill-sky-800"
                    d="M256 160L256 224L384 224L384 160C384 124.7 355.3 96 320 96C284.7 96 256 124.7 256 160zM192 224L192 160C192 89.3 249.3 32 320 32C390.7 32 448 89.3 448 160L448 224C483.3 224 512 252.7 512 288L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 288C128 252.7 156.7 224 192 224z"
                  />
                </svg>
              </div>
            </div>

            <Button
              isLoading={isLoding}
              type="submit"
              color="default"
              variant="shadow"
              className=" w-fit mx-auto text-lg lg:bg-sky-950 bg-sky-800 text-stone-300  hover:bg-stone-300 hover:text-stone-700 scale-85"
            >
              Sign In
            </Button>
            <p className="text-stone-300 text-center">
              Don't have an account?{" "}
              <Link to={"/register"} className="   lg:text-sky-950  text-sky-800">
                {" "}
                Create one now
              </Link>
            </p>

            {errorMessage && (
              <p className="text-sm bg-red-200 rounded-xl w-fit mx-auto p-1 text-red-800 text-center mt-0">
                {errorMessage}
              </p>
            )}
            {succssMessage && (
              <p className="text-sm bg-green-200 rounded-xl w-fit mx-auto p-1 text-green-800 text-center mt-0">
                {succssMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
