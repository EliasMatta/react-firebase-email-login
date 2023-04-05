import React, { useContext, useState, useEffect } from "react"

// Importing the module created in firebase.js used for authentication
import { auth } from "./firebase"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    // Creating a state that is used for storing the current user
    const [currentUser, setCurrentUser] = useState()

    // Creating a state that deals with the initial loading period
    const [wait, setWaiting] = useState(true)

    // Function that uses firebase's inbuilt functions for registering a user via email and password
    function register(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    // Function that uses firebase's inbuilt functions for logging in a user via email and password
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    // Function that uses firebase's inbuilt functions for logging out a user
    function logout() {
        return auth.signOut()
    }

    // Function that uses firebase's inbuilt functions for resetting the password for a user's account
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }


    // Only runs once, when component is mounted
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            // Loading should take place only after the current user is set
            setCurrentUser(user)
            setWaiting(false)
        })
        return unsubscribe
    }, [])

    // State that consists of the different fields required for the registration, the logging in and the logging out procedures.
    const fields = {
        currentUser,
        register,
        login,
        logout,
        resetPassword
    }

    return (
        <AuthContext.Provider value={fields}>
            {/* Checks if loading is taking place; the children can be rendered only after loading takes place */}
            {!wait && children}
        </AuthContext.Provider>
    )
}