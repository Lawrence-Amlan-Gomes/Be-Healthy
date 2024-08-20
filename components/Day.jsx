"use client";
import { useTheme } from "@/app/hooks/useTheme";
import HourBox from "./HourBox";
export default function Day({ hours, setHours, dayHours, day, days, setDays}) {
  const { theme } = useTheme();
  return (
    <div
      className={`w-[12%] float-left ${
        theme ? "bg-[#ffffff] text-[#0a0a0a]" : "bg-[#000000] text-[#ebebeb]"
      }`}
    >
      <div className="h-[80px] mt-[20px] w-full flex justify-center items-center font-bold text-[18px] border-x-[1px] border-b-[1px] border-b-[#7c7c7c] border-x-[#7c7c7c]">
        {day}
      </div>
      {dayHours.map((hour)=>
    <HourBox key={hour.id} setHours={setHours} hours={hours} tasks={hour.tasks} id={hour.id} day={day} days={days} setDays={setDays} dayHours={dayHours}/>
    )}
    </div>
  );
}
