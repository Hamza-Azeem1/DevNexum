import logo from '../public/logo.png'

function App() {
  return (
    <>
      {/* Main container with gradient background */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-black to-blue-700 text-white p-4 sm:p-8 md:p-12 lg:p-16">
        {/* Logo in top-left corner */}
        <div className="absolute -top-12 -left-0">
          <img src={logo} alt="DevNexum Logo" className="h-44 w-34" />
        </div>

        {/* Centered and styled DevNexum text */}
        <div style={{ fontFamily: 'Agdasima, sans-serif' }} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-widest drop-shadow-lg text-center">
          COMING SOON
        </div>

        {/* Tagline with bold Agdasima font */}
        <div
          style={{ fontFamily: 'Agdasima, sans-serif', fontWeight: 700 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl mt-4 text-gray-300 font-light text-center"
        >
          Crafting Digital Solutions, Empowering Your Vision.
        </div>
      </div>
    </>
  );
}

export default App;