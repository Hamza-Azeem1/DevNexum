import { useState, useEffect, useRef } from "react";
import logo from '../public/logo.png';
import './App.css';

function App() {
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });

  const eyeLeft = useRef();
  const eyeRight = useRef();
  const eyeBrowLeft = useRef();
  const eyeBrowRight = useRef();

  // Calculate the rotation angle for the eyes
  function calcAngle(element) {
    if (!element.current) return 0;

    // Get the center of the element
    let elX = element.current.offsetLeft + element.current.clientWidth / 2;
    let elY = element.current.offsetTop + element.current.clientHeight / 2;

    // Calculate the angle between the eye center and mouse position
    let rad = Math.atan2(mouseCoordinates.y - elY, mouseCoordinates.x - elX);
    let rot = rad * (180 / Math.PI);  // Convert radians to degrees

    return rot;
  }

  const handleMouseMove = (event) => {
    setMouseCoordinates({ x: event.clientX, y: event.clientY });

    // Adjust eyebrows based on mouse Y position
    if (eyeBrowLeft.current && eyeBrowRight.current) {
      let eyebrowMovement = Math.min(15, Math.max(-15, (event.clientY - window.innerHeight / 2) / 10));
      eyeBrowLeft.current.style.transform = `translateY(${eyebrowMovement}px)`;
      eyeBrowRight.current.style.transform = `translateY(${eyebrowMovement}px)`;
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", (event) => {
      const touch = event.touches[0];
      handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleMouseMove);
    };
  }, []);

  return (
    <div className="App">
      <div className="full-screen-bg">
        <div className="absolute -top-12 -left-0">
          <img src={logo} alt="DevNexum Logo" className="h-44 w-34" />
        </div>

        <div className="coming-soon-text">
          COMING S
          <span className="eye-container-wrapper">
            <div className="eye-container">
              <div ref={eyeLeft} style={{ transform: `rotate(${calcAngle(eyeLeft)}deg)` }} className="eye"></div>
              <div ref={eyeRight} style={{ transform: `rotate(${calcAngle(eyeRight)}deg)` }} className="eye"></div>
            </div>
            <div className="eyebrow-container">
              <div ref={eyeBrowLeft} className="eye_brow left"></div>
              <div ref={eyeBrowRight} className="eye_brow right"></div>
            </div>
          </span>
          N
        </div>

        <div className="text-2xl">
          Crafting Digital Solutions, Empowering Your Vision.
        </div>
      </div>
    </div>
  );
}

export default App;
