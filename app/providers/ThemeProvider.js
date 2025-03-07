'use client'

import {useState} from 'react';

import { ThemeContext } from '../contexts';

export default function ThemeProvider({children}) {
    const [theme, setTheme] = useState(false);

    return(
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}