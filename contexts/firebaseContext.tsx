/**
 * @file Firebase Context for app wide access to authentication state
 * @author PerhapsCow
 */

import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from "react"

import IUserData from "../types/user"
import firebase from "firebase"

/** Currently just a wrapper for firebase's User declaration, here to be
expanded later */
type IAuthenticatedUser = firebase.User

export type FirebaseContextType = {
    authenticatedUser?: IAuthenticatedUser | null
    firebase: typeof firebase
    userData?: IUserData | undefined
    setUserData: Dispatch<SetStateAction<IUserData | undefined>>
}

const defaultValue: FirebaseContextType = { firebase, setUserData: () => null }

// Create context using our firebase import so everywhere refers using the same instance
// User will start as undefined, representing "loading"
export const FirebaseContext = React.createContext<FirebaseContextType>(
    defaultValue,
)

// Provider for context
const FirebaseContextProvider: React.FC = (props) => {
    const [authenticatedUser, setAuthenticatedUser] = useState<
        FirebaseContextType["authenticatedUser"]
    >()

    const [userData, setUserData] = useState<IUserData>()

    // function to set state for context's user object
    const checkAuthUser = useCallback(
        async (tempUser: firebase.User | null) => {
            if (tempUser != null) {
                if (!tempUser.emailVerified) {
                    alert("Verify your email!")
                    firebase.auth().signOut()
                    tempUser.sendEmailVerification()
                } else {
                    return setAuthenticatedUser(tempUser)
                }

                return setAuthenticatedUser(tempUser)
            }
            setAuthenticatedUser(null)
        },
        [],
    )

    // on firebase's auth state changing, update our internal app auth context
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(checkAuthUser)
        return () => unsubscribe()
    }, [checkAuthUser])

    return (
        <FirebaseContext.Provider
            value={{ authenticatedUser, firebase, userData, setUserData }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseContextProvider
