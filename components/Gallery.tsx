import React, { useState, useEffect } from "react";

interface Image {
  id: number;
  url: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState([
    "https://images.unsplash.com/photo-1606926730770-218d179a690e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1606926730770-218d179a690e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch images from your API
    const fetchImages = async () => {
      try {
        const response = await fetch("https://your-api-endpoint.com/images");
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close modal only if the click was on the background overlay (outside the image)
    if ((e.target as HTMLDivElement).classList.contains("modal-overlay")) {
      setSelectedImage(null);
    }
  };

  return (
    <div className="flex lg:flex-col xsm:flex sm:flex gap-4 ">
  {images.map((image, index) => (
    <div
      key={index}
      className="relative overflow-hidden cursor-pointer"
      onClick={() => handleClick(image)}
    >
      <img src={image} alt={`Image ${index}`} className="w-full h-auto" />
    </div>
  ))}
  {selectedImage && (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50"
      onClick={handleModalClick}
    >
      <div className="modal-overlay absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="modal-container relative w-full max-w-lg md:max-w-xl lg:max-w-2xl bg-white rounded-lg shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <img
          src={selectedImage}
          alt="Selected Image"
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  )}
</div>

  );
};

export default Gallery;
