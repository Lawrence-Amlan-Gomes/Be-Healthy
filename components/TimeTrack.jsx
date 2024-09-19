"use client";

import { useTheme } from "@/app/hooks/useTheme";
import { useEffect, useState } from "react";
import Day from "./Day";
import { useDays } from "@/app/hooks/useDays";

export default function TimeTrack() {
  const { days, setDays } = useDays();
  const [mountYear, setMountYear] = useState("");
  const arrDay = [0, 1, 2, 3, 4, 5, 6];
  const dayArr = [];
  for (let i of arrDay) {
    dayArr.push(days[i].day.split(" "));
  }
  const { theme } = useTheme();
  return (
    <div
      className={`h-full w-[85%] float-left ${
        theme ? "bg-[#ffffff] text-[#0a0a0a]" : "bg-[#000000] text-[#ebebeb]"
      }`}
    >
      <div
        className={`${
          theme
            ? "border-[#cccccc] border-b-[1px]"
            : "border-[#222222] border-b-[1px]"
        } h-[10%] w-full flex justify-center items-center lg:text-[20px] font-bold`}
      >
        {mountYear}
      </div>
      <div className={`h-[10%] w-full`}>
        {arrDay.map((idx) => (
          <div
            key={idx}
            className={`lg:w-[14.1%] sm:w-[25%] w-[50%] h-full flex justify-center items-center overflow-y-auto overflow-x-hidden float-left ${
              theme
                ? "bg-[#ffffff] text-[#0a0a0a]"
                : "bg-[#000000] text-[#ebebeb]"
            }`}
          >
            {dayArr[idx][2]}
          </div>
        ))}
      </div>
      <div
        className={`h-[80%] w-full float-left overflow-y-auto ${
          theme ? "bg-[#ffffff] text-[#0a0a0a]" : "bg-[#000000] text-[#ebebeb]"
        }`}
      >
        <div className="h-full float-left">
          {days.map((day) => (
            <Day
              setMountYear={setMountYear}
              key={day.day}
              dayTasks={day.tasks}
              day={day.day}
              days={days}
              setDays={setDays}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
