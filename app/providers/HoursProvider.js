'use client'

import {useState} from 'react';

import { HoursContext } from '../contexts';

export default function HoursProvider({children}) {
    const [hours, setHours] = useState([
        {
          id: 1,
          time: "12:00 AM",
          highestTask: 0,
        },
        {
          id: 2,
          time: "1:00 AM",
          highestTask: 0,
        },
        {
          id: 3,
          time: "2:00 AM",
          highestTask: 0,
        },
        {
          id: 4,
          time: "3:00 AM",
          highestTask: 0,
        },
        {
          id: 5,
          time: "4:00 AM",
          highestTask: 0,
        },
        {
          id: 6,
          time: "5:00 AM",
          highestTask: 0,
        },
        {
          id: 7,
          time: "6:00 AM",
          highestTask: 0,
        },
        {
          id: 8,
          time: "7:00 AM",
          highestTask: 0,
        },
        {
          id: 9,
          time: "8:00 AM",
          highestTask: 0,
        },
        {
          id: 10,
          time: "9:00 AM",
          highestTask: 0,
        },
        {
          id: 11,
          time: "10:00 AM",
          highestTask: 0,
        },
        {
          id: 12,
          time: "11:00 AM",
          highestTask: 0,
        },
        {
          id: 13,
          time: "12:00 PM",
          highestTask: 0,
        },
        {
          id: 14,
          time: "1:00 PM",
          highestTask: 0,
        },
        {
          id: 15,
          time: "2:00 PM",
          highestTask: 0,
        },
        {
          id: 16,
          time: "3:00 PM",
          highestTask: 0,
        },
        {
          id: 17,
          time: "4:00 PM",
          highestTask: 0,
        },
        {
          id: 18,
          time: "5:00 PM",
          highestTask: 0,
        },
        {
          id: 19,
          time: "6:00 PM",
          highestTask: 0,
        },
        {
          id: 20,
          time: "7:00 PM",
          highestTask: 0,
        },
        {
          id: 21,
          time: "8:00 PM",
          highestTask: 0,
        },
        {
          id: 22,
          time: "9:00 PM",
          highestTask: 0,
        },
        {
          id: 23,
          time: "10:00 PM",
          highestTask: 0,
        },
        {
          id: 24,
          time: "11:00 PM",
          highestTask: 0,
        },
        {
          id: 25,
          time: "12:00 AM",
          highestTask: 0,
        },
      ]);

    return(
        <HoursContext.Provider value={{hours, setHours}}>
            {children}
        </HoursContext.Provider>
    )
}