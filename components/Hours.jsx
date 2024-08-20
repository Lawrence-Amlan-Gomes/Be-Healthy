"use client";

import { useTheme } from "@/app/hooks/useTheme";
import EachHour from "./EachHour";


export default function Hours({hours}) {
  const { theme } = useTheme();
  return (
    <div
      className={`w-[10%] float-left ${
        theme ? "bg-[#ffffff] text-[#0a0a0a]" : "bg-[#000000] text-[#ebebeb]"
      }`}
    >
      <div className="h-[99.5px] w-full"></div>
      {hours.map((hour)=>
        <EachHour key={hour.id} time={hour.time} maxTask={hour.highestTask} />
      )}
    </div>
  );
}
