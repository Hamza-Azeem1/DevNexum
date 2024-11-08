import logo from '../public/logo.png'

function App() {
  return (
    <>
      {/* Main container with gradient background */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-700 to-black text-white">
        {/* Logo in top-left corner */}
        <div className="absolute -top-10 left-8">
          <img src={logo} alt="DevNexum Logo" className="h-44 w-34" />
        </div>

        {/* Centered and styled DevNexum text */}
        <div className="text-6xl font-bold font-arial tracking-widest drop-shadow-lg">
          DevNexum
        </div>
      </div>
    </>
  );
}

export default App;

