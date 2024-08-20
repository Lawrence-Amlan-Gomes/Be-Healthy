"use client";

import { useTheme } from "@/app/hooks/useTheme";
import { useState } from "react";
import Day from "./Day";
import Hours from "./Hours";
import { useHours } from "@/app/hooks/useHours";
import { useDays } from "@/app/hooks/useDays";

export default function TimeTrack() {
  const { hours, setHours } = useHours();

  const { days, setDays } = useDays();

  const { theme } = useTheme();
  return (
    <div
      className={`h-full w-[80%] float-left overflow-auto ${
        theme ? "bg-[#ffffff] text-[#0a0a0a]" : "bg-[#000000] text-[#ebebeb]"
      }`}
    >
      <Hours hours={hours} />
      {days.map((day) => (
        <Day
          key={day.day}
          setHours={setHours}
          hours={hours}
          dayHours={day.hours}
          day={day.day}
          days={days}
          setDays={setDays}
        />
      ))}
    </div>
  );
}
