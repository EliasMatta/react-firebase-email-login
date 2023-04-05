import React from "react";

function ImageGallery({ imageUrls }) {
  return (
    <div class="wrapper">
      <div data-reactroot>
        <div>
          {/* Rendering the images */}
          {imageUrls.map((url, index) => (
            <img
              src={url}
              alt={`image-${index}`}
              key={index}
              style={{ maxWidth: "500px", margin: "20px" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageGallery;
