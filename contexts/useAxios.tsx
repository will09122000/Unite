/**
 * @file Hook-like wrapper for Firebase context
 * @author PerhapsCow
 */

import { AxiosContext, AxiosContextType } from "./axiosContext"

import { useContext } from "react"

export function useAxios(): AxiosContextType {
    return useContext(AxiosContext)
}
