import React from 'react';

const Shimmer = () => {
  return (
    <div className="animate-pulse flex flex-col space-y-4 ">
      <div className="bg-zinc-900 rounded-lg p-4">
        <div className="bg-zinc-800 rounded flex items-center justify-center h-[25vh]">
          <div className="bg-gray-400 h-full w-full rounded"></div>
        </div>
        <div className="mt-4 h-6 bg-gray-400 rounded"></div>
        <div className="mt-2 h-6 bg-gray-400 rounded w-3/4"></div>
        <div className="mt-2 h-6 bg-gray-400 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default Shimmer;
