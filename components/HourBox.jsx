"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { useEffect, useState } from "react";
import Task from "./Task";
export default function HourBox({
  setHours,
  hours,
  tasks,
  id,
  days,
  setDays,
  day,
  dayHours,
}) {
  const [len, setLen] = useState(tasks.length + 1)

  useEffect(()=>{
    if(tasks.length < 10){
      setLen(tasks.length + 1)
    }else if(tasks.length == 10){
      setLen(tasks.length)
    }
  },[tasks.length])

  useEffect(() => {
    for (let i of hours) {
      if (i.id == id) {
        if (i.highestTask < tasks.length && tasks.length < 10) {
          let tepmArr = [];
          for (let j of hours) {
            if (j.id != i.id) {
              tepmArr.push(j);
            } else {
              tepmArr.push({
                id: j.id,
                time: j.time,
                highestTask: tasks.length,
              });
            }
          }
          setHours(tepmArr);
        } else{
          if (tasks.length < 10) {
            setLen(i.highestTask + 1);
          }
        }
      }
    }
  }, [hours, id, len, setHours, tasks.length]);

  const handleClick = () => {
    let newTask = "";
    for (let i of tasks) {
      newTask = i.name;
    }
    if (newTask != "New Task") {
      let newTask = {
        id: tasks.length + 1,
        name: "New Task",
        time: "11.30 AM",
      };
      let newTasks = [];
      for (let i of tasks) {
        newTasks.push(i);
      }
      newTasks.push(newTask);
      let newDayHours = [];
      for (let i of dayHours) {
        if (i.id != id) {
          newDayHours.push(i);
        } else {
          newDayHours.push({
            id: id,
            tasks: newTasks,
          });
        }
      }
      let newDays = [];
      for (let i of days) {
        if (i.day != day) {
          newDays.push(i);
        } else {
          newDays.push({ day: day, hours: newDayHours });
        }
      }
      setDays(newDays)
      
    }
  };

  const { theme } = useTheme();
  return (
    <div
      className={`w-full float-left ${
        theme ? "bg-[#ffffff] text-[#0a0a0a]" : "bg-[#000000] text-[#ebebeb]"
      }`}
    >
      <div
        className={`${
          len == 1
            ? "h-[50px]"
            : len == 2
            ? "h-[100px]"
            : len == 3
            ? "h-[150px]"
            : len == 4
            ? "h-[200px]"
            : len == 5
            ? "h-[250px]"
            : len == 6
            ? "h-[300px]"
            : len == 7
            ? "h-[350px]"
            : len == 8
            ? "h-[400px]"
            : len == 9
            ? "h-[450px]"
            : len == 10
            ? "h-[500px]"
            : len == 11
            ? "h-[550px]"
            : "h-[550px]"
        } w-full font-bold text-[18px] border-x-[1px] border-b-[1px] border-b-[#7c7c7c] border-x-[#7c7c7c]`}
      >
        {tasks ? (
          tasks.map((task) => (
            <Task key={task.id} name={task.name} time={task.time} />
          ))
        ) : (
          <></>
        )}
        {tasks.length < 10 ? (
          <button
            onClick={handleClick}
            className={`w-[80%] mx-[10%] float-left border border-dotted border-[#7c7c7c] h-[30px] my-[10px] rounded-sm ${
              theme ? "hover:bg-[#f1f1f1]" : "hover:bg-[#0e0e0e]"
            }`}
          >
            +
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
