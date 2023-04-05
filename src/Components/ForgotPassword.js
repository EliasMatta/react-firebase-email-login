import React, { useRef, useState } from "react"

// Importing functions from react bootstrap for styling
import { Form, Button, Card, Alert } from "react-bootstrap"

// Importing useAuth() function from AuthContext.js
import { useAuth } from "../AuthContext"

// Importing functions from react-router-dom for linking different pages of the app
import { Link } from "react-router-dom"

// Importing the app logo
import Logo from "../1.png"

function ForgotPassword() {

  // Creating a reference for the email field in the reset password form
  const emailReference = useRef()

  // Getting resetPassword function from ../Auth Context, to use in the reset password form.
  const { resetPassword } = useAuth()

  //Creating an error state that is used for displaying error messages in the reset password page
  const [error, handleError] = useState("")

  // Creating a loading state that disables the reset password button .
  const [wait, waiting] = useState(false)

  // Creating a message state that is used for displaying a success message in the reset password page
  const [message, setMessage] = useState("")

  // Creating an asynchronous function that is called when the reset password button is clicked by a user
  async function handleSubmit(e) {

    // Prevents the reset password form from refreshing
    e.preventDefault()

    try {
      setMessage("")
      handleError("")
      waiting(true)
      
      // Wait for the resetPassword function to finish
      await resetPassword(emailReference.current.value)

      setMessage("Check your inbox for further instructions")

    } catch {
      handleError("Password reset unsuccessful")
    }
    // After waiting for the resetPassword function, we set the waiting to false, and can continue to press the reset password button
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
          <h2 className="text-center mb-4">Reset Password</h2>

          {/* If an error exists, a Bootstrap alert is rendered out.*/}
          {error && <Alert variant="danger">{error}</Alert>}

          {/* A Bootstrap alert is rendered out for displaying the success message. */}
          {message && <Alert variant="success">{message}</Alert>}

          {/* When the user presses the reset password button, the handleSubmit function is called */}
          <Form onSubmit={handleSubmit}>

            {/* Email field for entering user's email id */}
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailReference} required />
            </Form.Group>

            {/* Creating a button that is disabled when clicked , until the operation that should occur on clicking is completed.
                            Shown using the wait state */}
            <Button disabled={wait} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>

          {/* The user can go to the login page. */}
          <div className="w-100 text-center mt-3">
            <Link to="/login">Log In </Link>
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

export default ForgotPassword