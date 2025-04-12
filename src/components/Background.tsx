import React from "react";

const Background = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 ">
      <div className="absolute inset-0 ">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className="absolute inset-0">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect
              width="40"
              height="40"
              fill="none"
              stroke="white"
              strokeWidth="0.6"
              className="opacity-60 dark:opacity-20
          rotate-12 dark:-rotate-12 transition-all duration-500
          dark:stroke-white stroke-green-900"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
};

export default Background;
