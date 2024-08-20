"use client";
import { useState } from "react";
import GetStarted from "./GetStarted";
import StartingPage from "./StartingPage";

export default function MainPage() {
  const [isGetStarted, setIsGetStarted] = useState(false);

  return (
    <div className="h-full w-full">
      {isGetStarted ? (
        <GetStarted />
      ) : (
        <StartingPage setIsGetStarted={setIsGetStarted} />
      )}
    </div>
  );
}
