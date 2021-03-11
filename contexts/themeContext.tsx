import React, { Dispatch, SetStateAction, useState } from "react"

import styles from "../styles/StyleSheet"

export type ThemeType = typeof styles

export type ThemeContextType = {
    styles: ThemeType
    setTheme: Dispatch<SetStateAction<ThemeType>>
}

const defaultValue: ThemeContextType = { styles, setTheme: () => null }

export const ThemeContext = React.createContext<ThemeContextType>(defaultValue)

// Provider for context
const ThemeContextProvider: React.FC = (props) => {
    const [theme, setTheme] = useState<ThemeContextType["styles"]>(styles)

    return (
        <ThemeContext.Provider value={{ styles: theme, setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider
