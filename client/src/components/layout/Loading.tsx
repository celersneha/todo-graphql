import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fff5e6]/80 backdrop-blur">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-[#6949ff]/30 rounded-full border-t-[#c961ff] animate-spin"></div>
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold bg-gradient-to-r from-[#6949ff] to-[#c961ff] text-transparent bg-clip-text">
          Loading
        </span>
      </div>
    </div>
  );
};

export default Loading;
