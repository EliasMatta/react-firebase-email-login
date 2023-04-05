import React, { useState, useEffect } from "react"; // Import useEffect
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useHistory, useLocation } from "react-router-dom";

import { storage } from "../firebase";

function UploadImages() {
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // Retrieve the previous imageUrls state from props
    const prevImageUrls = location.state?.prevImageUrls ?? [];
    setImageUrls(prevImageUrls);
  }, [location.state]); // Update the state when location.state changes

  function handleHome() {
    setError("");
    try {
      history.goBack("/");
    } catch {
      setError("No Home Page");
    }
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImages([...images, e.target.files[0]]);
    }
  };

  const handleUpload = () => {
    if (images.length === 0) {
      setError("Please select an image to upload");
      return;
    }
    const urls = [];

    images.forEach((image) => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          setError(error.message);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              urls.push(url);
              if (urls.length === images.length) {
                setImageUrls([...imageUrls, ...urls]);
                // Pass the imageUrls state to the home page
                history.push({
                  pathname: "/",
                  state: { imageUrls: [...imageUrls, ...urls] },
                });
                setUploaded(true); // Set uploaded to true
              }
            });
        }
      );
    });

    setImages([]);
  };

  return (
    <>
      <h2 className="text-center mb-4">Upload Images</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {uploaded && <Alert variant="success">Uploaded!</Alert>}
      <div className="d-flex flex-column align-items-center">
        <input type="file" onChange={handleChange} multiple />
        <Button className="my-3" onClick={handleUpload}>
          Upload
        </Button>
        <Button onClick={handleHome}>Go to Home</Button>
      </div>
    </>
  );
}

export default UploadImages;
