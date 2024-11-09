import { useState, useEffect, useRef } from "react";
import logo from '../public/logo.png';

function App() {
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });

  const eyeLeft = useRef();
  const eyeRight = useRef();
  const eyeBrowLeft = useRef();
  const eyeBrowRight = useRef();

  function updatePupilPosition(eye) {
    if (!eye.current) return;

    const eyeRect = eye.current.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    const offsetX = mouseCoordinates.x - eyeCenterX;
    const offsetY = mouseCoordinates.y - eyeCenterY;

    const maxPupilMove = 8;
    const smoothFactor = 0.1;
    const pupilX = Math.max(Math.min(offsetX * smoothFactor, maxPupilMove), -maxPupilMove);
    const pupilY = Math.max(Math.min(offsetY * smoothFactor, maxPupilMove), -maxPupilMove);

    eye.current.style.setProperty("--pupilX", `${pupilX}px`);
    eye.current.style.setProperty("--pupilY", `${pupilY}px`);
  }

  const handlePointerMove = (x, y) => {
    setMouseCoordinates({ x, y });

    if (eyeBrowLeft.current && eyeBrowRight.current) {
      const eyebrowMovement = Math.min(8, Math.max(-8, (y - window.innerHeight / 2) / 20));
      eyeBrowLeft.current.style.transform = `translateY(${eyebrowMovement}px)`;
      eyeBrowRight.current.style.transform = `translateY(${eyebrowMovement}px)`;
    }
  };

  useEffect(() => {
    const handleMouseMove = (event) => handlePointerMove(event.clientX, event.clientY);
    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      if (touch) handlePointerMove(touch.clientX, touch.clientY);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  useEffect(() => {
    updatePupilPosition(eyeLeft);
    updatePupilPosition(eyeRight);
  }, [mouseCoordinates]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-black to-blue-900 text-white text-center relative font-sans">
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
        <img src={logo} alt="DevNexum Logo" className="h-20 w-auto sm:h-24 md:h-32" />
      </div>

      <div className="flex items-center justify-center text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider mb-4">
        COMING S
        <span className="relative inline-flex items-center ml-2 mr-2">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 relative">
            {/* Eyes */}
            <div
              ref={eyeLeft}
              className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white rounded-full shadow-inner flex items-center justify-center overflow-hidden"
            >
              <div
                className="absolute w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-blue-600 rounded-full flex items-center justify-center"
                style={{
                  transform: `translate(calc(var(--pupilX, 0px)), calc(var(--pupilY, 0px)))`,
                  transition: "transform 0.15s ease-out",
                }}
              >
                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-black rounded-full"></div>
              </div>
            </div>
            <div
              ref={eyeRight}
              className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white rounded-full shadow-inner flex items-center justify-center overflow-hidden"
            >
              <div
                className="absolute w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-blue-600 rounded-full flex items-center justify-center"
                style={{
                  transform: `translate(calc(var(--pupilX, 0px)), calc(var(--pupilY, 0px)))`,
                  transition: "transform 0.15s ease-out",
                }}
              >
                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-black rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Eyebrows */}
          <div
            ref={eyeBrowLeft}
            className="absolute top-[-12px] sm:top-[-16px] md:top-[-20px] lg:top-[-24px] left-1 sm:left-0 w-10 h-1 sm:w-12 sm:h-1.5 md:w-16 md:h-2 lg:w-18 lg:h-3.5 bg-gradient-to-r from-blue-700 to-black rounded-tl-xl rounded-tr-sm transition-transform"
            style={{
              transform: 'rotate(-12deg) perspective(100px) rotateX(10deg)',
              clipPath: 'polygon(0 0, 100% 30%, 100% 100%, 0% 100%)',
            }}
          ></div>

          <div
            ref={eyeBrowRight}
            className="absolute top-[-12px] sm:top-[-16px] md:top-[-20px] lg:top-[-24px] right-1 sm:right-0 w-10 h-1 sm:w-12 sm:h-1.5 md:w-16 md:h-2 lg:w-18 lg:h-3.5 bg-gradient-to-l from-blue-700 to-black rounded-tr-xl rounded-tl-sm transition-transform"
            style={{
              transform: 'rotate(12deg) perspective(100px) rotateX(10deg)',
              clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 100%)',
            }}
          ></div>
        </span>
        N
      </div>

      <div className="text-sm sm:text-lg md:text-xl lg:text-2xl mt-4 text-gray-300 px-4 sm:px-0">
        Crafting Digital Solutions, Empowering Your Vision.
      </div>
    </div>
  );
}

export default App;
