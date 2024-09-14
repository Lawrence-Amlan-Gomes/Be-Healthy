"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import EachField from "./EachField";
import { performLogin } from "@/app/actions";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/hooks/useTheme";

const LoginForm = () => {
  const { theme } = useTheme();
  const { setAuth } = useAuth();
  const router = useRouter();
  const [isTyping, setIsTyping] = useState(true);
  const [email, setEmail] = useState("");
  const [mainError, setMainError] = useState({
    isError: false,
    error: "Email or password is incorrect",
  });
  const [emailError, setEmailError] = useState({
    iserror: false,
    error: "",
  });
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState({
    iserror: false,
    error: "",
  });

  useEffect(() => {
    setEmailError({
      iserror: false,
      error: "",
    });
    setPasswordError({
      iserror: false,
      error: "",
    });
    setMainError({
      isError: false,
      error: "Email or password is incorrect",
    });
    setIsTyping(true);
  }, [email, password]);

  const submitForm = async () => {
    try {
      const found = await performLogin({
        email: email,
        password: password,
      });
      if (found) {
        setAuth(found);
        router.push("/");
      } else {
        setEmailError({
          iserror: true,
          error: "",
        });
        setPasswordError({
          iserror: true,
          error: "",
        });
        setMainError({
          isError: true,
          error: "Email or password is incorrect",
        });
        setIsTyping(false);
      }
    } catch (error) {
      console.log("Something went wrong");
      setMainError({
        isError: true,
        error: "SomeThing Went Wrong",
      });
    }
  };
  return (
    <div
      className={`h-full w-full flex justify-center items-center ${
        theme ? "bg-[#ffffff] text-[#0a0a0a]" : "bg-[#000000] text-[#ebebeb]"
      }`}
    >
      <div
        className={` p-10 rounded-lg w-[400px]  text-center shadow-lg ${
          theme ? "bg-[#ececec] text-[#0a0a0a]" : "bg-[#0f0f0f] text-[#f0f0f0]"
        }`}
      >
        <div className="text-[30px] font-bold mb-10 ">Login</div>
        {/* Trick the browser with this fake email and password field */}
        <div className="opacity-0">
          <EachField
            label="fake"
            type="email"
            name="email"
            isReal={false}
            placeholder="Enter your email"
            value={email}
            setValue={setEmail}
            iserror={emailError.iserror}
            error={emailError.error}
          />
          <EachField
            label="fake"
            type="password"
            name="password"
            isReal={false}
            placeholder="Enter your password"
            value={password}
            setValue={setPassword}
            iserror={passwordError.iserror}
            error={passwordError.error}
          />
        </div>
        <EachField
          label="Email"
          type="email"
          name="email"
          isReal={true}
          placeholder="Enter your email"
          value={email}
          setValue={setEmail}
          iserror={emailError.iserror}
          error={emailError.error}
        />
        <EachField
          label="Password"
          type="password"
          name="password"
          isReal={true}
          placeholder="Enter your password"
          value={password}
          setValue={setPassword}
          iserror={passwordError.iserror}
          error={passwordError.error}
        />
        {mainError.isError ? (
          <div className="mt-3 text-red-600">{mainError.error}</div>
        ) : (
          <></>
        )}
        <button
          onClick={submitForm}
          className={`text-[18px] text-white cursor-pointer rounded-full mt-10 py-2 px-6  ${"bg-green-800 hover:bg-green-700"}`}
        >
          Login
        </button>
        <p className="mt-10">
          No Account?{" "}
          <Link href="/register" className="text-blue-600 hover:text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
