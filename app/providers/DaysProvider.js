'use client'

import {useState} from 'react';

import { DaysContext } from '../contexts';

export default function DaysProvider({children}) {
    const [days, setDays] = useState([
        {
          day: "15 August",
          hours: [
            {
              id: 1,
              tasks: [],
            },
            {
              id: 2,
              tasks: [
                { id: 1, name: "New Task", time: "11.30 AM" },
                { id: 2, name: "New Task1", time: "11.30 AM" },
              ],
            },
            {
              id: 3,
              tasks: [],
            },
            {
              id: 4,
              tasks: [],
            },
            {
              id: 5,
              tasks: [],
            },
            {
              id: 6,
              tasks: [],
            },
            {
              id: 7,
              tasks: [],
            },
            {
              id: 8,
              tasks: [],
            },
            {
              id: 9,
              tasks: [],
            },
            {
              id: 10,
              tasks: [],
            },
            {
              id: 11,
              tasks: [],
            },
            {
              id: 12,
              tasks: [],
            },
            {
              id: 13,
              tasks: [],
            },
            {
              id: 14,
              tasks: [],
            },
            {
              id: 15,
              tasks: [],
            },
            {
              id: 16,
              tasks: [],
            },
            {
              id: 17,
              tasks: [],
            },
            {
              id: 18,
              tasks: [],
            },
            {
              id: 19,
              tasks: [],
            },
            {
              id: 20,
              tasks: [],
            },
            {
              id: 21,
              tasks: [],
            },
            {
              id: 22,
              tasks: [],
            },
            {
              id: 23,
              tasks: [],
            },
            {
              id: 24,
              tasks: [],
            },
          ],
        },
        {
          day: "16 August",
          hours: [
            {
              id: 1,
              tasks: [],
              num: 1,
            },
            {
              id: 2,
              tasks: [],
              num: 1,
            },
            {
              id: 3,
              tasks: [],
              num: 1,
            },
            {
              id: 4,
              tasks: [{ id: 1, name: "New Task", time: "11.30 AM" }],
              num: 1,
            },
            {
              id: 5,
              tasks: [],
              num: 1,
            },
            {
              id: 6,
              tasks: [],
              num: 1,
            },
            {
              id: 7,
              tasks: [],
              num: 1,
            },
            {
              id: 8,
              tasks: [],
              num: 1,
            },
            {
              id: 9,
              tasks: [],
              num: 1,
            },
            {
              id: 10,
              tasks: [],
              num: 1,
            },
            {
              id: 11,
              tasks: [],
              num: 1,
            },
            {
              id: 12,
              tasks: [],
              num: 1,
            },
            {
              id: 13,
              tasks: [],
              num: 1,
            },
            {
              id: 14,
              tasks: [],
              num: 1,
            },
            {
              id: 15,
              tasks: [],
              num: 1,
            },
            {
              id: 16,
              tasks: [],
              num: 1,
            },
            {
              id: 17,
              tasks: [],
              num: 1,
            },
            {
              id: 18,
              tasks: [],
              num: 1,
            },
            {
              id: 19,
              tasks: [],
              num: 1,
            },
            {
              id: 20,
              tasks: [],
              num: 1,
            },
            {
              id: 21,
              tasks: [],
              num: 1,
            },
            {
              id: 22,
              tasks: [],
              num: 1,
            },
            {
              id: 23,
              tasks: [],
              num: 1,
            },
            {
              id: 24,
              tasks: [],
              num: 1,
            },
          ],
        },
        {
          day: "17 August",
          hours: [
            {
              id: 1,
              tasks: [],
              num: 1,
            },
            {
              id: 2,
              tasks: [],
              num: 1,
            },
            {
              id: 3,
              tasks: [],
              num: 1,
            },
            {
              id: 4,
              tasks: [],
              num: 1,
            },
            {
              id: 5,
              tasks: [{ id: 1, name: "New Task", time: "11.30 AM" }],
              num: 1,
            },
            {
              id: 6,
              tasks: [],
              num: 1,
            },
            {
              id: 7,
              tasks: [],
              num: 1,
            },
            {
              id: 8,
              tasks: [],
              num: 1,
            },
            {
              id: 9,
              tasks: [],
              num: 1,
            },
            {
              id: 10,
              tasks: [],
              num: 1,
            },
            {
              id: 11,
              tasks: [],
              num: 1,
            },
            {
              id: 12,
              tasks: [],
              num: 1,
            },
            {
              id: 13,
              tasks: [],
              num: 1,
            },
            {
              id: 14,
              tasks: [],
              num: 1,
            },
            {
              id: 15,
              tasks: [],
              num: 1,
            },
            {
              id: 16,
              tasks: [],
              num: 1,
            },
            {
              id: 17,
              tasks: [],
              num: 1,
            },
            {
              id: 18,
              tasks: [],
              num: 1,
            },
            {
              id: 19,
              tasks: [],
              num: 1,
            },
            {
              id: 20,
              tasks: [],
              num: 1,
            },
            {
              id: 21,
              tasks: [],
              num: 1,
            },
            {
              id: 22,
              tasks: [],
              num: 1,
            },
            {
              id: 23,
              tasks: [],
              num: 1,
            },
            {
              id: 24,
              tasks: [],
              num: 1,
            },
          ],
        },
      ])

    const [activeTask, SetActiveTask] = useState({})

    return(
        <DaysContext.Provider value={{days, setDays, activeTask, SetActiveTask}}>
            {children}
        </DaysContext.Provider>
    )
}
