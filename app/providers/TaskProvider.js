"use client";

import { useState } from "react";

import { TaskContext } from "../contexts";

export default function TaskProvider({ children }) {
  const [task, setTask] = useState({id: 0, name: "", day: "", time: "" });
  const [clicked, setClicked] = useState(false);

  return (
    <TaskContext.Provider value={{ task, setTask, clicked, setClicked }}>
      {children}
    </TaskContext.Provider>
  );
}
