import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const nav = useNavigate();
  return (
    <div className="bg-white text-blue-900 min-h-screen flex items-center justify-center px-6 font-[montserrat]">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-extrabold text-red-600 mb-6">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p className="text-blue-700 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow">
            Home
          </Link>
          <button onClick={() => nav(-1)} className="border border-blue-600 text-blue-600 hover:bg-blue-100 px-6 py-2 rounded-md">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
