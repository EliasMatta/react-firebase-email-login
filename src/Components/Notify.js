import React, { useState } from "react"

// Importing functions from react bootstrap for styling
import { Alert } from "react-bootstrap"

import Button from 'react-bootstrap/Button';



// Importing functions from react-router-dom for linking different pages of the app
import { useHistory } from "react-router-dom"

function Notify() {

    //Creating an error state that is used for displaying error messages in the Notify page
    const [error, handleError] = useState("")

    
    // Creating a const variable history that can be used for redirecting the user to another page after an event is triggered
    const history = useHistory()

    // Creating an asynchronous function that is called when the log out button is clicked by a user
  function handleHome() {
        handleError("")
        try {
    
            history.goBack("/")
        } catch {
            handleError("No Home Page")
        }
    }

    return (
        < section>
            <nav>
                <h1>Notification</h1>
                {/* If an error exists, a Bootstrap alert is rendered out.*/}
                {error && <Alert variant="danger">{error}</Alert>}
                {/* Log out button which when clicked by a user, logs them out of the app */}
                <Button variant="dark" onClick={handleHome}>Go Back</Button>
            </nav>
        </section >
    )
}

export default Notify