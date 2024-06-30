import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 z-50">
      <div className="text-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primaryBlue border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        </div>
        <p className="mt-4 text-primaryBlue text-lg font-semibold">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
