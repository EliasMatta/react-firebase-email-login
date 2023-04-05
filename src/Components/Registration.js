import React, { useRef, useState } from "react"

// Importing functions from react bootstrap for styling
import { Form, Button, Card, Alert } from "react-bootstrap"

// Importing useAuth() function from AuthContext.js
import { useAuth } from "../AuthContext"

// Importing functions from react-router-dom for linking different pages of the app
import { Link, useHistory } from "react-router-dom"

// Importing the app logo
import Logo from "../1.png"

function Registration() {

    // Creating references for each of the fields in the registeration form
    const emailReference = useRef()
    const passwordReference = useRef()
    const passwordConfirmReference = useRef()
    const usernameReference = useRef()

    // Getting register function from ../Auth Context, to use in the registration form.
    const { register } = useAuth()

    //Creating an error state that is used for displaying error messages in the registration page
    const [error, handleError] = useState("")

    // Creating a loading state that disables the register button that will avoid multiple account creations during register phase.
    const [wait, waiting] = useState(false)

    // Creating a const variable history that can be used for redirecting the user to another page after an event is triggered
    const history = useHistory()

    // Creating an asynchronous function that is called when the register button is clicked by a user
    async function handleSubmit(event) {

        // Prevents the registration form from refreshing
        event.preventDefault()

        // Checking if the initial password and the password entered for confirmation is the same or not.
        if (passwordReference.current.value !== passwordConfirmReference.current.value) {
            return handleError("Passwords don't match")
        }

        try {
            handleError("")
            waiting(true)
            // Wait for the register function to finish
            await register(emailReference.current.value, passwordReference.current.value)
            // The user is redirected to the login page after account registration
            history.push("/login")
        } catch {
            handleError("Account registration unsuccessful")
        }

        // After waiting for the register function, we set the waiting to false, and can continue to press the register button
        waiting(false)
    }

    return (
        <>
        {/* App logo */}
        <div className="d-flex align-items-center justify-content-center">
        <img src={Logo} alt=""/>
        </div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Register</h2>

                    {/* If an error exists, a Bootstrap alert is rendered out.*/}
                    {error && <Alert variant="danger">{error}</Alert>}

                    {/* When the user presses the register button, the handleSubmit function is called */}
                    <Form onSubmit={handleSubmit}>

                        {/* Email field for entering user's email id */}
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailReference} required />
                        </Form.Group>

                        {/* Username field for entering user's username */}
                        <Form.Group id="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" ref={usernameReference} required />
                        </Form.Group>

                        {/* Password field for entering user's password */}
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordReference} required />
                        </Form.Group>

                        {/* Re-type password field for confirmation of user's password */}
                        <Form.Group id="password-confirm">
                            <Form.Label>Re-type Password</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmReference} required />
                        </Form.Group>

                        {/* Creating a button that is disabled when clicked , until the operation that should occur on clicking is completed.
                            Shown using the wait state */}
                        <Button disabled={wait} className="w-100" type="submit">
                            Register
                        </Button>

                    </Form>
                </Card.Body>
            </Card >
            {/* The user can go to the login page if they already have an account. */}
            <div className="w-100 text-center mt-2">
                Are you an existing user? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}

export default Registration
