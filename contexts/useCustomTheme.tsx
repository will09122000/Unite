/**
 * @file Hook-like wrapper for Firebase context
 * @author PerhapsCow
 */

import { ThemeContext, ThemeContextType } from "./themeContext"

import { useContext } from "react"

export function useCustomTheme(): ThemeContextType {
    return useContext(ThemeContext)
}
