import React from "react";
import { storage } from "../firebase";

function ImageGallery({ imageUrls, setImageUrls }) {

  async function handleDeleteImage(index) {
    // Delete the image from Firebase storage
    const imageRef = storage.refFromURL(imageUrls[index]);
    try {
      await imageRef.delete();
    } catch (error) {
      console.log("Error deleting image", error);
      return;
    }

    // Update the state to remove the deleted image
    const updatedImageUrls = [...imageUrls];
    updatedImageUrls.splice(index, 1);
    setImageUrls(updatedImageUrls);
  }

  return (
    <div className="wrapper">
      <div data-reactroot>
        <div>
          {/* Rendering the images */}
          {imageUrls.map((url, index) => (
            <div key={index} style={{ position: "relative" }}>
              <img
                src={url}
                alt={`image-${index}`}
                style={{ maxWidth: "500px", margin: "20px" }}
              />
              <button
                onClick={() => handleDeleteImage(index)}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageGallery;
