"use client";

import { useTask } from "@/app/hooks/useTask";
import { useTheme } from "@/app/hooks/useTheme";
import { useState } from "react";

export default function Task({ name, time, day, id, color }) {
  const { theme } = useTheme();
  const { setTask, setClicked } = useTask();
  return (
    <div
      onClick={() =>{
        setTask({ name: name, time: time, day: day, id:id })
        setClicked(true)
      } }
      className={`cursor-pointer w-[98%] h-[30px] text-white float-left ${color} rounded-lg m-[1%] text-start p-1 font-normal text-[14px] overflow-hidden scrollbar-none`}
    >
      <div className="w-[55%] h-full float-left px-1 mr-[5%] overflow-hidden">{name}</div>
      <div className="w-[40%] h-full overflow-hidden text-[12px] mt-[2px]">{time}</div>
    </div>
  );
}
