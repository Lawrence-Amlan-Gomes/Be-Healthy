"use client";

import { useTheme } from "@/app/hooks/useTheme";


export default function Task({name, time}) {
  const { theme } = useTheme();
  return (
    <div
      className={`w-full h-[50px] float-left bg-green-600 text-start p-1 font-normal text-[14px] break-words overflow-hidden border-[1px] border-b-[#7c7c7c]`}
    >
      {name}
    </div>
  );
}