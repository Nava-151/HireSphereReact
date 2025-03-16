// 
import { useNavigate } from "react-router-dom";
import SpiralGallery from "./SprialGallery";

const HomePage = () => {
  const navigate=useNavigate();

const handleSubmit=()=>{{
  console.log("in submit");
  
  navigate("/register");
}}
  return (
    <>
    <div className="relative w-full h-screen flex flex-col">
      <header className="p-4 bg-white shadow-md text-center text-xl font-bold">
        HireSphere
      </header>
      <div>
      <SpiralGallery/>
      </div>

        <button onClick={handleSubmit} className="absolute px-6 py-3 bg-white text-black font-semibold text-lg rounded-lg shadow-lg hover:bg-gray-200">
          Let's Start
        </button>
      </div>
    </>
  );
};

export default HomePage;
