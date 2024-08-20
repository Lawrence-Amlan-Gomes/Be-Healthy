"use client";

import { useState } from "react";
import TimeDetails from "./TimeDetails";
import TimeTrack from "./TimeTrack";

export default function GetStarted() {
  const [side, setSide] = useState(true);
  return (
    <div className={`h-full w-full`}>
      {side ? <TimeDetails side={side} setSide={setSide} /> : <></>}
      <TimeTrack />
      {!side ? <TimeDetails side={side} setSide={setSide}/> : <></>}
    </div>
  );
}
