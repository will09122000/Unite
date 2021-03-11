import "firebase/firestore"

import * as firebase from "firebase"

import { Alert } from "react-native"

// User Sign In
export async function signInAuth(email: string, password: string) {
    try {
        await firebase.default
            .auth()
            .signInWithEmailAndPassword(email, password)
        return true
    } catch (err) {
        Alert.alert("Something went wrong", err.message)
        return false
    }
}

// User Log Out
export async function loggingOutAuth() {
    try {
        await firebase.default.auth().signOut()
    } catch (err) {
        Alert.alert("Something went wrong", err.message)
    }
}

// Users wants to reset password
export async function newPassword(email: string) {
    try {
        await firebase.default.auth().sendPasswordResetEmail(email)
        return true
    } catch (err) {
        Alert.alert("Something went wrong", err.message)
        return false
    }
}
