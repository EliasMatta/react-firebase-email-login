import React, { useRef, useState } from "react"

// Importing functions from react bootstrap for styling
import { Form, Button, Card, Alert } from "react-bootstrap"

// Importing useAuth() function from AuthContext.js
import { useAuth } from "../AuthContext"

// Importing functions from react-router-dom for linking different pages of the app
import { Link, useHistory } from "react-router-dom"

// Importing the app logo
import Logo from "../1.png"

function Login() {

    // Creating references for each of the fields in the login form
    const emailReference = useRef()
    const passwordReference = useRef()

    // Getting login function from ../Auth Context, to use in the login form.
    const { login } = useAuth()

    //Creating an error state that is used for displaying error messages in the login page
    const [error, handleError] = useState("")

    // Creating a loading state that disables the login button.
    const [wait, waiting] = useState(false)

    // Creating a const variable history that can be used for redirecting the user to another page after an event is triggered
    const history = useHistory()

    // Creating an asynchronous function that is called when the login button is clicked by a user
    async function handleSubmit(event) {

        // Prevents the login form from refreshing
        event.preventDefault()

        try {
            handleError("")
            waiting(true)
            // Wait for the login function to finish
            await login(emailReference.current.value, passwordReference.current.value)
            // The user is redirected to the home page after logging in
            history.push("/")
        } catch {
            handleError("Log in unsuccessful")
        }

        // After waiting for the login function, we set the waiting to false, and can continue to press the login button
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
                    <h2 className="text-center mb-4">Log In</h2>

                    {/* If an error exists, a Bootstrap alert is rendered out.*/}
                    {error && <Alert variant="danger">{error}</Alert>}

                    {/* When the user presses the login button, the handleSubmit function is called */}
                    <Form onSubmit={handleSubmit}>

                        {/* Email field for entering user's email id */}
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailReference} required />
                        </Form.Group>

                        {/* Password field for entering user's password */}
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordReference} required />
                        </Form.Group>

                        {/* Creating a button that is disabled when clicked , until the operation that should occur on clicking is completed.
                            Shown using the wait state */}
                        <Button disabled={wait} className="w-100" type="submit">
                            Log In
                        </Button>

                    </Form>

                    {/* The user can go to the reset password page if they forgot the password of their account. */}
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgotPassword">Forgot Password? </Link>
                    </div>
                </Card.Body>
            </Card>

            {/* The user can go to the register page if they don't have an account yet. */}
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/registration">Register</Link>
            </div>
        </>
    )
}

export default Login