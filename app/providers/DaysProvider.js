"use client";

import { useEffect, useState } from "react";
import { DaysContext } from "../contexts";

export default function DaysProvider({ children }) {
  let today = new Date();
  let dateStr = today.toString();
  let day = dateStr.slice(0, 3);
  let month = dateStr.slice(4, 7);
  let date = dateStr.slice(8, 10);
  let intdate = parseInt(date.toString(), 10);
  let year = dateStr.slice(11, 15);
  let nextYear = (parseInt(year) + 1).toString();
  let loop = false;
  let dayloop = false;
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let daysArr = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let allDays = [];

  let d = 0;
  if (day == "Sat") {
    d = 0;
  } else if (day == "Sun") {
    d = 1;
  } else if (day == "Mon") {
    d = 2;
  } else if (day == "Tue") {
    d = 3;
  } else if (day == "Wed") {
    d = 4;
  } else if (day == "Thu") {
    d = 5;
  } else if (day == "Fri") {
    d = 6;
  }

  for (let i of months) {
    if (i == "Jan") {
      let x = 1;
      if (month == i) {
        loop = true;
        x = intdate;
      }
      if (loop) {
        while (x <= 31) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]} ${year}`,
            tasks: [],
          });
          // d = (d+1)%6
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "Feb") {
      let x = 1;
      if (month == i) {
        loop = true;
        x = intdate;
      }
      if (loop) {
        while (x <= 28) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]} ${year}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "Mar") {
      let x = 1;
      if (month == i) {
        loop = true;
        x = intdate;
      }
      if (loop) {
        while (x <= 31) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]} ${year}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "Apr") {
      let x = 1;
      if (month == i) {
        loop = true;
        x = intdate;
      }
      if (loop) {
        while (x <= 30) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]}  ${year}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "May") {
      let x = 1;
      if (month == i) {
        loop = true;
        x = intdate;
      }
      if (loop) {
        while (x <= 31) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]} ${year}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "Jun") {
      let x = 1;
      if (month == i) {
        loop = true;
        x = intdate;
      }
      if (loop) {
        while (x <= 30) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]}  ${year}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "Jul") {
      let x = 1;
      if (month == i) {
        loop = true;
        x = intdate;
      }
      if (loop) {
        while (x <= 31) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]} ${year}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "Aug") {
      let x = 1;
      if (month == i) {
        loop = true;
        x = intdate;
      }
      if (loop) {
        while (x <= 31) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]}  ${year}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "Sep") {
      let x = 1;
      if (month == i) {
        loop = true;
        x = intdate;
      }
      if (loop) {
        while (x <= 30) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]} ${year}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "Oct") {
      let x = 1;
      if (month == i) {
        loop = true;
        x = intdate;
      }
      if (loop) {
        while (x <= 31) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]} ${year}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "Nov") {
      let x = 1;
      if (month == i) {
        loop = true;
        x = intdate;
      }
      if (loop) {
        while (x <= 30) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]} ${year}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "Dec") {
      let x = 1;
      if (month == i) {
        loop = true;
        x = intdate;
      }
      if (loop) {
        while (x <= 31) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]} ${year}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
  }

  for (let i of months) {
    if (i == "Jan") {
      let x = 1;
      {
        while (x <= 31) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]} ${nextYear}`,
            tasks: [],
          });
          // d = (d+1)%6
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "Feb") {
      let x = 1;
      {
        while (x <= 28) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]} ${nextYear}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "Mar") {
      let x = 1;
      {
        while (x <= 31) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]} ${nextYear}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "Apr") {
      let x = 1;
      {
        while (x <= 30) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]} ${nextYear}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "May") {
      let x = 1;
      {
        while (x <= 31) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]} ${nextYear}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "Jun") {
      let x = 1;
      {
        while (x <= 30) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]} ${nextYear}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "Jul") {
      let x = 1;
      {
        while (x <= 31) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]} ${nextYear}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "Aug") {
      let x = 1;
      {
        while (x <= 31) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]} ${nextYear}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "Sep") {
      let x = 1;
      {
        while (x <= 30) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]} ${nextYear}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "Oct") {
      let x = 1;
      {
        while (x <= 31) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]} ${nextYear}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "Nov") {
      let x = 1;
      {
        while (x <= 30) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]} ${nextYear}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
    if (i == "Dec") {
      let x = 1;
      {
        while (x <= 31) {
          allDays.push({
            day: `${x} ${i} ${daysArr[d]} ${nextYear}`,
            tasks: [],
          });
          if (d == 6) {
            d = 0;
          } else {
            d += 1;
          }
          x += 1;
        }
      }
    }
  }
  const [days, setDays] = useState([]);

  useEffect(() => {
    setDays(allDays);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DaysContext.Provider value={{ days, setDays }}>
      {children}
    </DaysContext.Provider>
  );
}
