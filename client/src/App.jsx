import { useState, useEffect, useRef } from "react";
import logo from '../public/logo.png';
import './App.css';  // Assuming you're using a regular CSS file

function App() {
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });

  const eyeLeft = useRef();
  const eyeRight = useRef();

  const eyeBrowLeft = useRef();
  const eyeBrowRight = useRef();

  // Calculate the angle of the eyes based on the mouse position
  function calcAngle(element) {
    if (!element.current) return;

    let elX = element.current.offsetLeft + element.current.clientWidth / 2;
    let elY = element.current.offsetTop + element.current.clientHeight / 2;

    var rad = Math.atan2(mouseCoordinates.x - elX, mouseCoordinates.y - elY);
    var rot = rad * (180 / Math.PI) * -1 + -18;

    return rot;
  }

  const handleMouseMove = (event) => {
    setMouseCoordinates({ x: event.clientX, y: event.clientY });

    eyeBrowLeft.current.style.transform = `translateY(${event.clientY / 50}px)`;
    eyeBrowRight.current.style.transform = `translateY(${event.clientY / 50}px)`;
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="App">
      {/* Full screen gradient background */}
      <div className="full-screen-bg">
        {/* Logo in top-left corner */}
        <div className="absolute -top-12 -left-0">
          <img src={logo} alt="DevNexum Logo" className="h-44 w-34" />
        </div>

        {/* Centered and styled COMING SOON text with eyes replacing OO */}
        <div className="coming-soon-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-widest drop-shadow-lg text-center">
          COMING S
          <span className="eye-container">
            <div ref={eyeLeft} style={{ transform: `rotate(${calcAngle(eyeLeft)}deg)` }} className="eye"></div>
            <div ref={eyeRight} style={{ transform: `rotate(${calcAngle(eyeRight)}deg)` }} className="eye"></div>
          </span>
          N
        </div>

        {/* Tagline with bold Agdasima font */}
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl mt-4 text-gray-300 font-light text-center">
          Crafting Digital Solutions, Empowering Your Vision.
        </div>
      </div>

      {/* Cursor animation: Eyebrows */}
      <div className="eyebrow_container">
        <div ref={eyeBrowLeft} className="eye_brow left"></div>
        <div ref={eyeBrowRight} className="eye_brow right"></div>
      </div>
    </div>
  );
}

export default App;
