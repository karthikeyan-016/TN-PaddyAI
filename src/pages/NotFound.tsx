import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1D2430]">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-white">404</h1>
        <p className="mb-4 text-xl text-gray-400">Oops! Page not found</p>
        <Link to="/" className="text-green-500 underline hover:text-green-400">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
