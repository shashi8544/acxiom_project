import React, { useState, useEffect } from 'react';

import "./automaticImageChangerHomePage.css";
const AutomaticImageChanger = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const imageUrls = [
    'https://firebasestorage.googleapis.com/v0/b/interiit-57302.appspot.com/o/Image%2Fathlete-gb45b1e826_1280.jpg?alt=media&token=4d3d2a42-2429-4651-b364-43539b7a20d2',
    'https://firebasestorage.googleapis.com/v0/b/interiit-57302.appspot.com/o/Image%2Fbadminton-g859bb222c_1280.jpg?alt=media&token=8e20fd69-517f-4616-904d-cdddcdfbb55c',
    'https://firebasestorage.googleapis.com/v0/b/interiit-57302.appspot.com/o/Image%2FScreenshot%202023-06-12%20154213.png?alt=media&token=d70b9512-b2c5-45b9-8709-031bd6ea9f9e',
    'https://firebasestorage.googleapis.com/v0/b/interiit-57302.appspot.com/o/Image%2Fsunset-g5631e5178_1280.jpg?alt=media&token=f706c986-44f0-4428-b4f8-ea64dbd5e87a',
    'https://firebasestorage.googleapis.com/v0/b/interiit-57302.appspot.com/o/Image%2Fchampions-g1d581bb35_1280.jpg?alt=media&token=8b8d638a-eab7-453b-b094-5891ea94d633',
    
    // 'image-url-3.jpg',
    // Add more image URLs as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the currentImage index to show the next image
      setCurrentImage((prevImage) => (prevImage + 1) % imageUrls.length);
    }, 800); // Change the image every 1 second (1000ms)

    // Clear the interval when the component is unmounted to avoid memory leaks
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Use the currentImage index to show the corresponding image */}
      <img id ="autoImageChanger"src={imageUrls[currentImage]} alt={``} />
    </div>
  );
};

export default AutomaticImageChanger;
