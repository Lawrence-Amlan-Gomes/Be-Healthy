"use client";
import { useEffect, useState } from "react";
import EachField from "./EachField";
import { useAuth } from "@/app/hooks/useAuth";
import { callChangePassword } from "@/app/actions";
import { useTheme } from "@/app/hooks/useTheme";

const ChangePassword = () => {
  const { theme } = useTheme();
  const { auth, setAuth } = useAuth();
  const [noError, setNoError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState({
    iserror: true,
    error: "Password is incorrect",
  });
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState({
    iserror: true,
    error: "Your password must be at least 8 characters",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState({
    iserror: true,
    error: "Your password must be at least 8 characters",
  });

  useEffect(() => {
    if (newPassword.length < 8) {
      setNewPasswordError({
        iserror: true,
        error: "Your password must be at least 8 characters",
      });
    } else {
      setNewPasswordError({
        iserror: false,
        error: "Your password must be at least 8 characters",
      });
    }
    if (confirmPassword.length < 8) {
      setConfirmPasswordError({
        iserror: true,
        error: "Your password must be at least 8 characters",
      });
    } else {
      if (confirmPassword.length >= 8 && newPassword != confirmPassword) {
        setConfirmPasswordError({
          iserror: true,
          error: "Isn't matching with new password",
        });
      } else {
        setConfirmPasswordError({
          iserror: false,
          error: "Your password must be at least 8 characters",
        });
      }
    }
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    if (auth) {
      if (auth.password != password) {
        setPasswordError({ ...passwordError, iserror: true });
      } else {
        setPasswordError({ ...passwordError, iserror: false });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  useEffect(() => {
    if (passwordError.iserror == false && newPasswordError.iserror == false) {
      if (confirmPasswordError.iserror == false) {
        setNoError(true);
      } else {
        setNoError(false);
      }
    } else {
      setNoError(false);
    }
  }, [
    newPasswordError.iserror,
    passwordError.iserror,
    confirmPasswordError.iserror,
  ]);

  const submitForm = async () => {
    if (noError) {
      const sureSubmit = confirm("Are you sure want to change you password?");
      if (sureSubmit) {
        if (auth) {
          await callChangePassword(auth.email, newPassword);
          setAuth({ ...auth, password: newPassword });
        }
      }
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
        <div className="text-[30px] font-bold mb-10 ">Change Password</div>
        <EachField
          label="Old Password"
          type="password"
          name="password"
          isReal={true}
          placeholder="Enter your old Password"
          value={password}
          setValue={setPassword}
          iserror={passwordError.iserror}
          error={passwordError.error}
        />
        <EachField
          label="New Password"
          type="password"
          name="password"
          isReal={true}
          placeholder="Enter your new Password"
          value={newPassword}
          setValue={setNewPassword}
          iserror={newPasswordError.iserror}
          error={newPasswordError.error}
        />
        <EachField
          label="Confirm New Password"
          type="password"
          name="password"
          isReal={true}
          placeholder="Confirm your Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          iserror={confirmPasswordError.iserror}
          error={confirmPasswordError.error}
        />
        <button
          onClick={submitForm}
          className={`text-[18px] cursor-pointer rounded-full mt-10 py-2 px-6 mb-5 shadow-md ${
            noError
              ? "bg-green-700 text-white"
              : theme
              ? "bg-[#dbdbdb] text-[#808080]"
              : "bg-[#1a1a1a] text-[#696969]"
          }`}
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
