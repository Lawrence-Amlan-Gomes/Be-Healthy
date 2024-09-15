"use client";
import Image from "next/image";
import Link from "next/link";
import ProfileIcon from "./ProfileIcon";
import { useTheme } from "@/app/hooks/useTheme.js";
import { useTask } from "@/app/hooks/useTask";
const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { clicked, setClicked } = useTask();
  return (
    <div
    onMouseOver={()=>setClicked(false)}
      className={`h-[10%] ${theme ? "bg-[#d1d1d1]" : "bg-[#070707]"}`}
    >
      <div className="w-[20%] h-full float-left flex justify-center items-center">
        <Link href="/">
          <div className={`text-[30px] font-bold text-center ${theme ? "text-[#222222]" : "text-[#dadada]"}`}>Time Track</div>
        </Link>
      </div>
      <div className="h-full float-left flex justify-end items-center w-[75%] mr-[5%]">
        <ul className="flex gap-10 text-[#cfcfcf]">
          <li>
            <button
              className={`text-[18px] py-2 px-5 shadow-lg rounded-full ${
                theme
                  ? "bg-[#b3b3b3] hover:bg-[#acacac] text-black"
                  : "bg-[#1f1f1f] hover:bg-[#272727] text-zinc-300"
              }`}
              onClick={() => setTheme((prev) => !prev)}
            >
              {theme ? "Dark" : "Light"}
            </button>
          </li>
          <li>
            <ProfileIcon />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
