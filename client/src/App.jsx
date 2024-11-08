import { useState, useEffect, useRef } from "react";
import logo from '../public/logo.png';
import './App.css';

function App() {
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });

  const eyeLeft = useRef();
  const eyeRight = useRef();
  const eyeBrowLeft = useRef();
  const eyeBrowRight = useRef();

  function calcAngle(element) {
    if (!element.current) return;
    let elX = element.current.offsetLeft + element.current.clientWidth / 2;
    let elY = element.current.offsetTop + element.current.clientHeight / 2;

    let rad = Math.atan2(mouseCoordinates.x - elX, mouseCoordinates.y - elY);
    let rot = rad * (180 / Math.PI) * -1 + -18;

    return rot;
  }

  const handleMouseMove = (event) => {
    setMouseCoordinates({ x: event.clientX, y: event.clientY });

    if (eyeBrowLeft.current && eyeBrowRight.current) {
      eyeBrowLeft.current.style.transform = `translateY(${event.clientY / 100}px)`;
      eyeBrowRight.current.style.transform = `translateY(${event.clientY / 100}px)`;
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
          <span className="eye-container">
            <div ref={eyeLeft} style={{ transform: `rotate(${calcAngle(eyeLeft)}deg)` }} className="eye"></div>
            <div ref={eyeRight} style={{ transform: `rotate(${calcAngle(eyeRight)}deg)` }} className="eye"></div>
          </span>
          N
        </div>

        <div className="text-2xl">
          Crafting Digital Solutions, Empowering Your Vision.
        </div>

        <div className="eyebrow_container">
          <div ref={eyeBrowLeft} className="eye_brow left"></div>
          <div ref={eyeBrowRight} className="eye_brow right"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
