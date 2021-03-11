import AppNavigator from "./navigators/AppNavigator"
import AxiosContextProvider from "./contexts/axiosContext"
import FirebaseContextProvider from "./contexts/firebaseContext"
import React from "react"
import firebase from "firebase"
import { firebaseConfig } from "./config/keys"
import ThemeContextProvider from "./contexts/themeContext"

// Main App
const App: React.FC = () => {
    // Connect With Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
    }

    return (
        <FirebaseContextProvider>
            <AxiosContextProvider>
                <ThemeContextProvider>
                    <AppNavigator />
                </ThemeContextProvider>
            </AxiosContextProvider>
        </FirebaseContextProvider>
    )
}

export default App
