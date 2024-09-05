"use client";

import { useState } from "react";
import TimeDetails from "./TimeDetails";
import TimeTrack from "./TimeTrack";

export default function GetStarted() {
  return (
    <div className={`h-full w-full`}>
      <TimeDetails/>
      <TimeTrack />
    </div>
  );
}
