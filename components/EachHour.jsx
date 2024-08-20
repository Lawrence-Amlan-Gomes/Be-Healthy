"use client";

import { useTheme } from "@/app/hooks/useTheme";
import { useEffect, useState } from "react";

export default function EachHour({ time, maxTask }) {
  const { theme } = useTheme();
  return (
    <div
      className={`w-[90%] ml-[10%] ${
        maxTask == 0
          ? "h-[50px]"
          : maxTask == 1
          ? "h-[100px]"
          : maxTask == 2
          ? "h-[150px]"
          : maxTask == 3
          ? "h-[200px]"
          : maxTask == 4
          ? "h-[250px]"
          : maxTask == 5
          ? "h-[300px]"
          : maxTask == 6
          ? "h-[350px]"
          : maxTask == 7
          ? "h-[400px]"
          : maxTask == 8
          ? "h-[450px]"
          : maxTask == 9
          ? "h-[500px]"
          : maxTask == 10
          ? "h-[550px]"
          : "h-[550px]"
      } float-left relative border-t-[1px] border-t-[#7c7c7c] ${
        theme ? "bg-[#ffffff] text-[#0a0a0a]" : "bg-[#000000] text-[#ebebeb]"
      }`}
    >
      <div
        className={`absulute mt-[-13px] w-[70%] text-center ${
          theme ? "bg-[#ffffff] text-[#0a0a0a]" : "bg-[#000000] text-[#ebebeb]"
        }`}
      >
        {time}
      </div>
    </div>
  );
}
