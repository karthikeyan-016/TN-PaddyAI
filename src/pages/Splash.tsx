import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sprout } from "lucide-react";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1D2430]">
      <div className="flex flex-col items-center space-y-6">
        <Sprout className="w-24 h-24 text-green-500 animate-pulse" />
        <h1 className="text-4xl font-bold text-white text-center">
          Tamil Nadu Rice Prediction
        </h1>
        <div className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 rounded-full transition-all duration-[3000ms] ease-out"
            style={{ width: '100%' }}
          />
        </div>
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  );
};

export default Splash;
