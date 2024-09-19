"use client";
import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";
import { useTheme } from "@/app/hooks/useTheme";

const ProfileIcon = () => {
  const { theme } = useTheme();
  const { auth } = useAuth();
  const handleClick = () => {
  };

  return (
    <div>
      {auth ? (
        <Link href="/profile">
          <div
            className="h-[40px] w-[40px] rounded-full bg-white relative overflow-hidden"
            onClick={handleClick}
          >
            {auth.photo == "" ? (
              <div className="w-full h-full flex justify-center items-center text-[30px] font-bold">
                <div className="text-black cursor-pointer">
                  {auth.name != undefined ? auth.name.charAt(0) : "" }
                </div>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={auth.photo} alt="profilepic" width="100%"></img>
            )}
          </div>
        </Link>
      ) : (
        <Link href="/login">
          <button className={`text-[18px] py-2 px-5 shadow-lg rounded-full ${theme?"bg-[#b8b8b8] hover:bg-[#b2b2b2] text-black":"bg-[#1f1f1f] hover:bg-[#272727] text-zinc-300"}`}>
            Login
          </button>
        </Link>
      )}
    </div>
  );
};

export default ProfileIcon;
