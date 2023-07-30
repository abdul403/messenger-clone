"use client";

import Button from "@/app/components/Button";
import InputForm from "@/app/components/input/InputForm";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";

import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [varaint, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleVaraint = useCallback(() => {
    if (varaint === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [varaint, setVariant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (varaint === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
          if (callback?.ok) {
            // router.push("/conversations");
            router.push("/");
            toast.success("login to use messenger");
          }
        })

        .catch(() => {
          toast.error("Some thing went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (varaint === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            return toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            // router.push("/conversations");
            toast.success("Logged In ");
          }
          router.push("/users");
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error("Invalid Credentials!");
      }
    });
  };

  return (
    <div
      className="
    mt-8 
    sm:mx-auto
    sm:w-full
    sm:max-w-md
    
    "
    >
      <div
        className="
          bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
          "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {varaint === "REGISTER" && (
            <InputForm
              disabled={isLoading}
              id="name"
              label="Name"
              register={register}
              errors={errors}
            />
          )}
          <InputForm
            id="email"
            disabled={isLoading}
            label="Email"
            type="email"
            register={register}
            errors={errors}
          />{" "}
          <InputForm
            disabled={isLoading}
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
          />
          <div>
            <Button disabled={isLoading} fullWidth type={"submit"}>
              {varaint === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="
                       absolute
                      inset-0
                      flex
                      items-center
                      "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className=" bg-white text-gray-500 px-2">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div
          className="
        flex
        gap-2
        justify-center
        text-sm
        mt-6
        px-2
        text-gray-500
        "
        >
          <div>
            {varaint === "LOGIN"
              ? "New to Messenger?"
              : "Already have an Account?"}
          </div>
          <div className="underline cursor-pointer" onClick={toggleVaraint}>
            {varaint === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
