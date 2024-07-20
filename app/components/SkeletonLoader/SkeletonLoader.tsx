import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="min-h-screen bg-black ">
      <header className="mb-1">
        <div className="flex space-x-4 p-4">
          {Array(8).fill(0).map((_, index) => (
            <div key={index} className="bg-slate-800 p-4 rounded shadow-md w-8/12 animate-pulse">
              <div className="h-4 bg-gray-500 rounded mb-4"></div>
            </div>
          ))}
        </div>
      </header>
      <div className="flex space-x-4">
        <div className="w-1/4">
          <div className="bg-slate-800 p-4 rounded shadow-md animate-pulse">
            <div className="h-4 bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="h-10 bg-gray-800 rounded mb-4"></div>
            <div className="h-4 bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="h-10 bg-gray-800 rounded mb-4"></div>
            <div className="h-10 bg-gray-800 rounded mt-4"></div>
          </div>
        </div>
        <div className="w-3/4">
          <div className="bg-slate-800 p-4 rounded shadow-md h-full animate-pulse">
            <div className="h-6 bg-gray-800 rounded w-1/2 mb-4"></div>
            <div className="h-96 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
