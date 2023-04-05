import React from "react"

import Registration from "./Components/Registration"
import Home from "./Components/Home"
import Login from "./Components/Login"
import PrivateRoute from "./Components/PrivateRoute"
import ForgotPassword from "./Components/ForgotPassword"
import Notify from "./Components/Notify"
import UploadImages from "./Components/UploadImages"
// Importing functions from react bootstrap for styling
import { Container } from "react-bootstrap"

// Importing AuthProvider() function from AuthContext.js
import { AuthProvider } from "./AuthContext"

// Importing functions from react-router-dom for routing set up of the app
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
  return (
    // Content within this container gets aligned in the center
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            {/* Switch determines which page the user is currently on*/}
            <Switch>
              {/* PrivateRoute is used for the home page ; a user can access it if logged in */}
              <PrivateRoute exact path="/" component={Home} />
              {/* Route determines which route on the current page the user is going to*/}
              <Route path="/registration" component={Registration} />
              <Route path="/login" component={Login} />
              <Route path="/forgotPassword" component={ForgotPassword} />
              <Route path="/notify" component={Notify} />
              <Route path="/UploadImages" component={UploadImages} />
              <Route path="/Home" component={UploadImages} />

            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container >

  )

}

export default App