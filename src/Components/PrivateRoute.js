import React from 'react'

// Importing functions from react-router-dom for setting up the private route 
import { Route, Redirect } from "react-router-dom"

// Importing useAuth() function from AuthContext.js
import { useAuth } from "../AuthContext"

// Function used as wrapper for the current route. Used to return the route
function PrivateRoute({ component: Component, ...rest }) {

    // Getting currentUser state from ../Auth Context.
    const { currentUser } = useAuth()

    return (
        <Route
            {...rest}
            render={props => {
                // To check if the user is currently logged into the app or not. If not, the user cannot access the app through the home page unless logged in
                return currentUser ? <Component{...props} /> : <Redirect to="/login" />
            }

            }
        >
        </Route>
    )
}

export default PrivateRoute
