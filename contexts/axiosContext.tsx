import React, { useEffect } from "react"
import axios, { AxiosInstance } from "axios"

import { useAuthUser } from "./useAuthUser"

const defaultOptions = {
    baseURL: "http://77.68.127.201:8080",
    headers: {
        "Content-Type": "application/json",
    },
}

// Create instance
const instance = axios.create(defaultOptions)

export type AxiosContextType = {
    instance: AxiosInstance
}

const defaultValue: AxiosContextType = { instance }

// Create context using our axios instance so everywhere refers using the same instance
export const AxiosContext = React.createContext<AxiosContextType>(defaultValue)

// Provider for context
const AxiosContextProvider: React.FC = (props) => {
    const { authenticatedUser, userData, setUserData } = useAuthUser()

    const getUserData = async () => {
        if (authenticatedUser) {
            const response = await instance.get(
                `/users/${authenticatedUser.uid}`,
            )
            if (response.data.users[0] !== userData) {
                setUserData(response.data.users[0])
            }
        } else {
            setUserData(undefined)
        }
    }

    // Set the AUTH token for any request
    instance.interceptors.request.use(async function (config) {
        if (authenticatedUser) {
            const token = await authenticatedUser.getIdToken()
            config.headers.Authorization = authenticatedUser
                ? `Bearer ${token}`
                : ""
        }
        return config
    })

    // Set the AUTH token for any request
    instance.interceptors.response.use(async function (value) {
        // If data returned is of type IPostData, rerequest user data
        return value
    })

    useEffect(() => {
        getUserData()
    }, [authenticatedUser])

    return (
        <AxiosContext.Provider value={{ instance }}>
            {props.children}
        </AxiosContext.Provider>
    )
}

export default AxiosContextProvider
