"use client";
import { useDays } from "@/app/hooks/useDays";
import { useTask } from "@/app/hooks/useTask";
import { useTheme } from "@/app/hooks/useTheme";
import { useEffect, useState } from "react";
import { callUpdateDays } from "@/app/actions";
import { useAuth } from "@/app/hooks/useAuth";

export default function TimeDetails() {
  const { theme } = useTheme();
  const { auth, setAuth } = useAuth();
  const [taskCliced, setTaskClicked] = useState(true);
  const [noError, setNoError] = useState(true);
  const { task, setTask, clicked, setClicked } = useTask();
  const { days, setDays } = useDays();
  console.log(task);

  useEffect(() => {
    if (auth) {
      if (auth.days.length != 0) {
        let tempArr = [];
        let diff = auth.days.length - days.length;
        while (diff < auth.days.length) {
          tempArr.push(auth.days[diff]);
          diff += 1;
        }
        setDays(tempArr);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateDayAuth = async (thisDays) => {
    if (auth) {
      await callUpdateDays(auth.email, thisDays);
    }
  };

  const deleteTask = () => {
    const sure = confirm("Are you sure want to delete this task?");
    if (sure) {
      let newTasks = [];
      for (let i of days) {
        if (i.day == task.day) {
          for (let k of i.tasks) {
            if (k.id != task.id) {
              newTasks.push(k);
            }
          }
        }
      }
      let newDays = [];
      for (let i of days) {
        if (i.day != task.day) {
          newDays.push(i);
        } else {
          newDays.push({
            day: i.day,
            tasks: newTasks,
          });
        }
      }
      setDays(newDays);
      setClicked(false);
      updateDayAuth(newDays);
    }
  };

  const setEveryday = () => {
    const sure = confirm("Are you sure want to set this task for everyday?");

    if (sure) {
      if (noError) {
        let newDays = [];
        for (let i of days) {
          let clone = true;
          let newTasks = [];
          for (let k of i.tasks) {
            newTasks.push(k);
            if (k.name.trim() == task.name.trim()) {
              clone = false;
            }
          }
          if (clone) {
            newTasks.push({
              id: `${i.day} ${task.name}`,
              name: task.name.trim(),
              time: task.time,
              color: "bg-blue-700",
            });
          }
          let newDay = { day: i.day, tasks: newTasks };
          newDays.push(newDay);
        }
        setDays(newDays);
        updateDayAuth(newDays);
      }
    }
  };

  const setWeekly = () => {
    const sure = confirm("Are you sure want to set this task for Weekly?");
    if (sure) {
      if (noError) {
        let newDays = [];
        for (let i of days) {
          let arrMainTask = task.day.split(" ");
          let arrThisTask = i.day.split(" ");
          let clone = true;
          let newTasks = [];
          if (arrMainTask[2] == arrThisTask[2]) {
            for (let k of i.tasks) {
              newTasks.push(k);
              if (k.name.trim() == task.name.trim()) {
                clone = false;
              }
            }
            if (clone) {
              newTasks.push({
                id: `${i.day} ${task.name}`,
                name: task.name.trim(),
                time: task.time,
                color: "bg-purple-700",
              });
            }
            let newDay = { day: i.day, tasks: newTasks };
            newDays.push(newDay);
          } else {
            for (let k of i.tasks) {
              newTasks.push(k);
            }
            let newDay = { day: i.day, tasks: newTasks };
            newDays.push(newDay);
          }
        }
        setDays(newDays);
        updateDayAuth(newDays);
      }
    }
  };

  const updateTask = () => {
    if (noError) {
      let newTasks = [];
      for (let i of days) {
        if (i.day == task.day) {
          for (let k of i.tasks) {
            if (k.id != task.id) {
              newTasks.push(k);
            } else {
              newTasks.push({
                id: k.id,
                name: task.name.trim(),
                time: task.time,
                color: "bg-green-700",
              });
            }
          }
        }
      }
      let newDays = [];
      for (let i of days) {
        if (i.day != task.day) {
          newDays.push(i);
        } else {
          newDays.push({
            day: i.day,
            tasks: newTasks,
          });
        }
      }
      setDays(newDays);
      updateDayAuth(newDays);
    }
  };

  const deleteAll = () => {
    const sure = confirm("Are you sure want to set this task from all day?");
    if (sure) {
      if (noError) {
        let newDays = [];
        for (let i of days) {
          let newTasks = [];
          for (let k of i.tasks) {
            if (k.name.trim() != task.name.trim()) {
              newTasks.push(k);
            }
          }
          let newDay = { day: i.day, tasks: newTasks };
          newDays.push(newDay);
        }
        setDays(newDays);
        updateDayAuth(newDays);
      }
    }
  };

  return (
    <div
      className={`h-full w-[15%] float-left overflow-y-auto ${
        theme ? "bg-[#b1b1b1] text-[#0a0a0a]" : "bg-[#131313] text-[#ebebeb]"
      }`}
    >
      <div className="w-full p-3">
        {clicked ? (
          <>
            {" "}
            <textarea
              className={`${
                theme ? "border-black" : "border-white"
              } p-3 border-[2px] max-h-[100px] box-border w-full rounded-md focus:outline-none focus:outline-[1px] focus:shadow-none bg-transparent placeholder:text-[#666666]`}
              value={task.name}
              name="text"
              type="text"
              onChange={(e) => setTask({ ...task, name: e.target.value })}
              placeholder="Add your task"
              autoComplete="off"
            />
            <input
              className={`${
                theme ? "border-black" : "border-white"
              } p-3 mt-3 border-[2px] box-border w-full rounded-md focus:outline-none focus:outline-[1px] focus:shadow-none bg-transparent placeholder:text-[#666666]`}
              value={task.time}
              name="text"
              type="text"
              onChange={(e) => setTask({ ...task, time: e.target.value })}
              placeholder="Add your time"
              autoComplete="off"
            />
            <button
              onClick={updateTask}
              className={`text-[18px] w-full cursor-pointer rounded-lg mt-3 py-2 px-6 shadow-md ${
                noError
                  ? "bg-green-800 hover:bg-green-700 text-white"
                  : theme
                  ? "bg-[#dbdbdb] text-[#808080]"
                  : "bg-[#1a1a1a] text-[#696969]"
              }`}
            >
              Update
            </button>
            <button
              onClick={setEveryday}
              className={`text-[18px] w-full cursor-pointer rounded-lg mt-3 py-2 px-6 shadow-md ${
                noError
                  ? "bg-blue-800 hover:bg-blue-700 text-white"
                  : theme
                  ? "bg-[#dbdbdb] text-[#808080]"
                  : "bg-[#1a1a1a] text-[#696969]"
              }`}
            >
              Set Everyday
            </button>
            <button
              onClick={setWeekly}
              className={`text-[18px] w-full cursor-pointer rounded-lg mt-3 py-2 px-6 shadow-md ${
                noError
                  ? "bg-purple-800 hover:bg-purple-700 text-white"
                  : theme
                  ? "bg-[#dbdbdb] text-[#808080]"
                  : "bg-[#1a1a1a] text-[#696969]"
              }`}
            >
              Set Weekly
            </button>
            <button
              onClick={deleteTask}
              className={`text-[18px] w-full cursor-pointer rounded-lg mt-3 py-2 px-6 shadow-md bg-red-800 hover:bg-red-700 text-white`}
            >
              Delete
            </button>
            <button
              onClick={deleteAll}
              className={`text-[18px] w-full cursor-pointer rounded-lg mt-3 py-2 px-6 shadow-md bg-orange-800 hover:bg-orange-700 text-white`}
            >
              Delete All
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
