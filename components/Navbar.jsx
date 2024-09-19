"use client";
import Image from "next/image";
import Link from "next/link";
import ProfileIcon from "./ProfileIcon";
import { useTheme } from "@/app/hooks/useTheme.js";
import { useTask } from "@/app/hooks/useTask";
import ToogleTheme from "./ToogleTheme";
const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { clicked, setClicked } = useTask();
  return (
    <div
    onMouseOver={()=>setClicked(false)}
      className={`h-[10%] ${theme ? "bg-[#dddddd] border-[#cccccc] border-b-[1px]" : "bg-[#0a0a0a] border-[#222222] border-b-[1px]"}`}
    >
      <div className="w-[20%] h-full float-left flex justify-center items-center">
        <Link href="/">
          <div className={`text-[30px] font-bold text-center ${theme ? "text-[#222222]" : "text-[#dadada]"}`}>Time Track</div>
        </Link>
      </div>
      <div className="h-full float-left flex justify-end items-center w-[75%] mr-[5%]">
        <ul className="flex gap-10 text-[#cfcfcf]">
          <li>
            <ToogleTheme/>
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
