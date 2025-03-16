// 
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigate=useNavigate();
  return (
    <div className="relative w-full h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 bg-white shadow-md text-center text-xl font-bold">
        HireSphere
      </header>

      {/* Background Image with Black Mask */}
      <div className="relative flex-1 flex justify-center items-center">
        <img 
          src="./assets/logo.webp" 
          alt="HireSphere Logo" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Centered Button */}
        <button onSubmit={() => {navigate("\register")}} className="absolute px-6 py-3 bg-white text-black font-semibold text-lg rounded-lg shadow-lg hover:bg-gray-200">
          Let's Start
        </button>
      </div>
    </div>
  );
};

export default HomePage;
