import React, { useState } from "react"
import { Alert } from "react-bootstrap"
import { BsPlusCircleFill } from "react-icons/bs"
import Button from 'react-bootstrap/Button'
import { useAuth } from "../AuthContext"
import { useHistory, useLocation } from "react-router-dom"
import ImageGallery from "./ImageGallery"

function Home() {
  const [error, setError] = useState("")
  const { logout } = useAuth()
  const history = useHistory()
  const location = useLocation()
  const [imageUrls, setImageUrls] = useState(location.state?.imageUrls ?? []) // Add state for imageUrls

  async function handleLogout() {
    setError("")
    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Log out failed")
    }
  }

  async function handleNotification() {
    setError("")
    try {
      history.push("/notify")
    } catch {
      setError("No Notification")
    }
  }

  async function handleUpload() {
    setError("")
    try {
      history.push("/UploadImages", { prevImageUrls: imageUrls }) // Pass the previous imageUrls state as a prop
    } catch {
      setError("Error Access Denied")
    }
  }

  return (
    <section>
      <nav>
        <h1>Welcome to Instagram </h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="dark" onClick={handleLogout}>Log Out</Button>
        <Button variant="dark" onClick={handleNotification}>Notification</Button>
      </nav>
      <body>
        <ImageGallery imageUrls={imageUrls} />
      </body>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 69,
        }}
      >
        <Button variant="dark" onClick={handleUpload}><BsPlusCircleFill /></Button>
      </div>
    </section>
  )
}

export default Home
