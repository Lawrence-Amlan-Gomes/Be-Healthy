"use client";
import { useTheme } from "@/app/hooks/useTheme";
import Task from "./Task";
export default function Day({ day, days, setDays, dayTasks, setMountYear }) {
  const { theme } = useTheme();
  let today = new Date();
  let dateStr = today.toString();
  let isToday = false;
  let todayArray = dateStr.split(" ")
  let thisDayArray = day.split(" ")
  console.log(todayArray)
  console.log(thisDayArray)
  if(todayArray[1] == thisDayArray[1] && todayArray[2] == thisDayArray[0]){
    if(todayArray[3] == thisDayArray[3]){
      isToday = true
    }
  }
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const dayArr = day.split(" ");
  const mouseOver = () => {
    let dayArrM = day.split(" ");
    let month = "";
    if (dayArrM[1] == "Jan") {
      month = "January";
    } else if (dayArrM[1] == "Feb") {
      month = "February";
    } else if (dayArrM[1] == "Mar") {
      month = "March";
    } else if (dayArrM[1] == "Apr") {
      month = "April";
    } else if (dayArrM[1] == "May") {
      month = "May";
    } else if (dayArrM[1] == "Jun") {
      month = "June";
    } else if (dayArrM[1] == "Jul") {
      month = "July";
    } else if (dayArrM[1] == "Aug") {
      month = "August";
    } else if (dayArrM[1] == "Sep") {
      month = "September";
    } else if (dayArrM[1] == "Oct") {
      month = "October";
    } else if (dayArrM[1] == "Nov") {
      month = "November";
    } else if (dayArrM[1] == "Dec") {
      month = "December";
    }
    setMountYear(`${month}  ${dayArrM[3]}`);
  };

  const handleClick = () => {
    let newTaskName = "";
    let preId = 1;
    for (let i of dayTasks) {
      newTaskName = i.name;
      preId += 1;
    }
    if (newTaskName.trim() != "New Task") {
      let newTask = {
        id: `${day} ${preId}`,
        name: "New Task",
        time: `${hours}:${minutes} H`,
        color: "bg-green-700",
      };
      let newTasks = [];
      for (let i of dayTasks) {
        newTasks.push(i);
      }
      newTasks.push(newTask);
      let newDays = [];
      for (let i of days) {
        if (i.day != day) {
          newDays.push(i);
        } else {
          newDays.push({ day: day, tasks: newTasks });
        }
      }
      setDays(newDays);
    }
  };
  return (
    <div
      onMouseOver={mouseOver}
      className={`lg:w-[14.28%] sm:w-[25%] w-[50%] h-[50%] overflow-y-auto overflow-x-hidden float-left border-[1px] border-[#666666] ${
        theme ? "bg-[#ffffff] text-[#0a0a0a]" : "bg-[#000000] text-[#ebebeb]"
      }`}
    >
      <div className={`h-[50px] w-full flex justify-center items-center text-center text-[16px] ${ isToday ? "text-red-600 font-bold" : ""}`}>
        {dayArr[0] == 1 ? `${dayArr[0]} ${dayArr[1]}` : dayArr[0]}
      </div>
      <div className="">
        {dayTasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            name={task.name}
            time={task.time}
            day={day}
            color={task.color}
          />
        ))}
        <button
          onClick={handleClick}
          className={`w-[80%] mx-[10%] float-left border flex justify-center items-center rounded-lg border-dotted text-[#7c7c7c] border-[#7c7c7c] h-[20px] mt-[10px] ${
            theme ? "hover:bg-[#f1f1f1]" : "hover:bg-[#0e0e0e]"
          }`}
        >
          +
        </button>
      </div>
    </div>
  );
}
