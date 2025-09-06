



import React, { useState } from "react";
import { Input, Button, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../schema/RegisterSchema.js";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../Services/authServices.js";
// import { formdata } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export default function Registerpage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sucssMessage, setSucssMessage] = useState("");
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },

    resolver: zodResolver(RegisterSchema),
  });
  // mood:onTutch;

  async function handelRegister(formdata) {
    setIsLoading(true);
    const data = await registerApi(formdata);
    setIsLoading(false);
    if (data.error) {
      setErrorMessage(data.error);
      setSucssMessage("");
    } else {
      setErrorMessage("");

      setSucssMessage(data.message);
      reset();
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
    // console.log(data);
  }

  return (
  <div 
  style={{
        backgroundImage:
          "radial-gradient(circle at center,   #1eae98  0%,#09203f 50%   ,   #1eae98  100%)",
      }}
      className="relative py-10 animate-scale-pulse min-h-screen flex items-center justify-center"
    >
      <div className="container max-w-sm sm:max-w-md lg:max-w-lg px-3  py-2 my-2 mx-auto rounded-xl shadow-xl border-1 border-stone-200 backdrop-blur-md  ">
        <form onSubmit={handleSubmit(handelRegister)} >
          <div className=" flex justify-center   ">
            <FontAwesomeIcon
              icon={faUser}
              className="text-5xl rounded-full bg-stone-300 p-4  lg:text-sky-950 text-sky-800 "
            />
            
        
          </div>
          

          <h1 className="text-center text-shadow-xl text-stone-300 m-5 text-4xl">
            Wealcom Back!
          </h1>

          <div className=" flex flex-col gap-6 text-stone-300  ">
            <div className="relative  text-white">
              <Input
                isInvalid={Boolean(errors.name?.message)}
                errorMessage={errors.name?.message}
                variant="bordered"
                label="Name"
                type="text"
                className="w-full pl-3 border-stone-200 "
                {...register("name")}
              />

              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="h-5 w-5 text-stone-900"
                >
                  <path
                    className="lg:fill-sky-950 fill-sky-800"
                    d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"
                  />
                </svg>
              </div>
            </div>

            <div className="relative ">
              <Input
                isInvalid={Boolean(errors.email?.message)}
                errorMessage={errors.email?.message}
                variant="bordered"
                label="Email"
                type="email"
                className="w-full pl-3  "
                {...register("email")}
              />

              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="h-5 w-5 text-stone-900"
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
                  className="h-5 w-5 text-stone-900"
                >
                  <path
                    className="lg:fill-sky-950 fill-sky-800"
                    d="M256 160L256 224L384 224L384 160C384 124.7 355.3 96 320 96C284.7 96 256 124.7 256 160zM192 224L192 160C192 89.3 249.3 32 320 32C390.7 32 448 89.3 448 160L448 224C483.3 224 512 252.7 512 288L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 288C128 252.7 156.7 224 192 224z"
                  />
                </svg>
              </div>
            </div>

            <div className="relative ">
              <Input
                isInvalid={Boolean(errors.rePassword?.message)}
                errorMessage={errors.rePassword?.message}
                color=""
                variant="bordered"
                label="Confirm password"
                type="password"
                className="w-full pl-3 text-sky-950"
                {...register("rePassword")}
              />

              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="h-5 w-5 text-stone-900"
                >
                  <path
                    className="lg:fill-sky-950 fill-sky-800"
                    d="M256 160L256 224L384 224L384 160C384 124.7 355.3 96 320 96C284.7 96 256 124.7 256 160zM192 224L192 160C192 89.3 249.3 32 320 32C390.7 32 448 89.3 448 160L448 224C483.3 224 512 252.7 512 288L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 288C128 252.7 156.7 224 192 224z"
                  />
                </svg>
              </div>
            </div>

            <div className="flex gap-6 ">
              <Input
                isInvalid={Boolean(errors.dateOfBirth?.message)}
                errorMessage={errors.dateOfBirth?.message}
                className=""
                variant="bordered"
                label="Date"
                type="date"
                {...register("dateOfBirth")}
              />

              <Select
                isInvalid={Boolean(errors.gender?.message)}
                errorMessage={errors.gender?.message}               
                 variant="bordered"
                className="text-stone-300"
                label="gender"
                placeholder="Select Gender"
                {...register("gender")}
              >
                <SelectItem key={"male"} >Male</SelectItem>
                <SelectItem key={"female"}>Female</SelectItem>
              </Select>
            </div>
            <Button
              isLoading={isLoading}
              type="submit"
              color="default"
              variant="shadow"
              className=" w-fit mx-auto  text-lg lg:bg-sky-950 bg-sky-800 text-stone-300  hover:bg-stone-300 hover:text-stone-600 scale-85"
            >
              Register
            </Button>
            <p className="text-stone-200 text-center">
              Already have an account?{" "}
              <Link to={'/login'} className=" lg:text-sky-700 text-sky-950 ">
                {" "}
                Sign in here
              </Link>
            </p>

            {errorMessage && (
              <p className="text-sm bg-red-200 rounded-xl w-fit mx-auto p-1 text-red-800 text-center mt-0">
                {errorMessage}
              </p>
            )}
            {sucssMessage && (
              <p className="text-sm bg-green-200 rounded-xl w-fit mx-auto p-1 text-green-800 text-center mt-0">
                {sucssMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
