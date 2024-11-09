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

    const maxPupilMove = 15;
    const pupilX = Math.max(Math.min(offsetX / 10, maxPupilMove), -maxPupilMove);
    const pupilY = Math.max(Math.min(offsetY / 10, maxPupilMove), -maxPupilMove);

    eye.current.style.setProperty("--pupilX", `${pupilX}px`);
    eye.current.style.setProperty("--pupilY", `${pupilY}px`);
  }

  const handlePointerMove = (x, y) => {
    setMouseCoordinates({ x, y });

    if (eyeBrowLeft.current && eyeBrowRight.current) {
      const eyebrowMovement = Math.min(10, Math.max(-10, (y - window.innerHeight / 2) / 15));
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
      <div className="absolute -top-12 -left-0">
        <img src={logo} alt="DevNexum Logo" className="h-44 w-34" />
      </div>

      <div className="flex items-center justify-center text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider mb-4">
        COMING S
        <span className="relative inline-flex items-center ml-2 mr-2">
          <div className="flex items-center gap-4 relative">
            {/* Eyes */}
            <div
              ref={eyeLeft}
              className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white rounded-full shadow-inner flex items-center justify-center overflow-hidden"
            >
              <div
                className="absolute w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-blue-600 rounded-full flex items-center justify-center"
                style={{
                  transform: `translate(calc(var(--pupilX, 0px)), calc(var(--pupilY, 0px)))`,
                  transition: "transform 0.1s ease-in-out",
                }}
              >
                <div className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-black rounded-full"></div>
              </div>
            </div>
            <div
              ref={eyeRight}
              className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white rounded-full shadow-inner flex items-center justify-center overflow-hidden"
            >
              <div
                className="absolute w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-blue-600 rounded-full flex items-center justify-center"
                style={{
                  transform: `translate(calc(var(--pupilX, 0px)), calc(var(--pupilY, 0px)))`,
                  transition: "transform 0.1s ease-in-out",
                }}
              >
                <div className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-black rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Eyebrows */}
          <div
            ref={eyeBrowLeft}
            className="absolute top-[-20px] md:top-[-24px] lg:top-[-28px] left-1 md:left-0 w-12 h-2 md:w-16 md:h-3 lg:w-18 lg:h-3.5 bg-gradient-to-r from-blue-700 to-black rounded-tl-xl rounded-tr-sm transition-transform"
            style={{
              transform: 'rotate(-12deg) perspective(100px) rotateX(10deg)',
              clipPath: 'polygon(0 0, 100% 30%, 100% 100%, 0% 100%)',
            }}
          ></div>

          <div
            ref={eyeBrowRight}
            className="absolute top-[-20px] md:top-[-24px] lg:top-[-28px] right-1 md:right-0 w-12 h-2 md:w-16 md:h-3 lg:w-18 lg:h-3.5 bg-gradient-to-l from-blue-700 to-black rounded-tr-xl rounded-tl-sm transition-transform"
            style={{
              transform: 'rotate(12deg) perspective(100px) rotateX(10deg)',
              clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 100%)',
            }}
          ></div>
        </span>
        N
      </div>

      <div className="text-xl md:text-2xl lg:text-3xl mt-4 text-gray-300">
        Crafting Digital Solutions, Empowering Your Vision.
      </div>
    </div>
  );
}

export default App;
