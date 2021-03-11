/**
 * @file Hook-like wrapper for Firebase context
 * @author PerhapsCow
 */

import { FirebaseContext, FirebaseContextType } from "./firebaseContext"

import { useContext } from "react"

export function useAuthUser(): FirebaseContextType {
    return useContext(FirebaseContext)
}
