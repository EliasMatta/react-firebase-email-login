import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { BsPlusCircleFill, BsBellFill, BsHeartFill, BsPersonFill } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import { useAuth } from "../AuthContext";
import { useHistory, useLocation } from "react-router-dom";
import ImageGallery from "./ImageGallery";
import { auth, storage } from "../firebase";
import "../Home.css";

function Home() {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [imageUrls, setImageUrls] = useState(location.state?.imageUrls ?? []);

  async function handleLogout(setUser, setImageUrls, setError) {
    setError("");
    try {
      // Get a reference to the Firebase storage folder for the images
      const imagesRef = storage.ref("images");
  
      // Get a list of all the images in the folder
      const imagesList = await imagesRef.listAll();
  
      // Filter the images that are not in the imageUrls state
      const imagesToDelete = imagesList.items.filter(
        (item) => !imageUrls.includes(item.location.path)
      );
  
      // Delete each image that needs to be deleted
      await Promise.all(
        imagesToDelete.map((item) => {
          return item.delete();
        })
      );
  
      // Log out the user
      await auth.signOut();
  
      // Set the user state to null
      setUser(null);
  
      // Set the imageUrls state to an empty array
      setImageUrls([]);
  
      // Redirect the user to the login page
      useHistory.push("/login");
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleNotification() {
    setError("");
    try {
      history.push("/notify");
    } catch {
      setError("No Notification");
    }
  }

  async function handleUpload() {
    setError("");
    try {
      history.push("/UploadImages", { prevImageUrls: imageUrls });
    } catch {
      setError("Error Access Denied");
    }
  }

  return (
    <section className="home-container">
      <nav className="home-nav">
        <h1 className="home-header">Instagram</h1>
        <div className="home-nav-icons">
          <BsBellFill className="home-nav-icon" />
          <BsHeartFill className="home-nav-icon" />
          <BsPersonFill className="home-nav-icon" onClick={handleLogout} />
        </div>
      </nav>
      <body>
        <ImageGallery imageUrls={imageUrls} setImageUrls={setImageUrls} />
      </body>
      <div className="home-upload-icon">
        <Button variant="primary" onClick={handleUpload}><BsPlusCircleFill /></Button>
      </div>
    </section>
  )
}

export default Home;
