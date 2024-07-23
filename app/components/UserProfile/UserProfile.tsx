'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const UserProfile: React.FC = () => {
  const router = useRouter();
  const nickname = localStorage.getItem('nickname');
  const avatar = localStorage.getItem('avatar');

  const handleLogout = () => {
    localStorage.removeItem('nickname');
    localStorage.removeItem('avatar');
    router.push('/');
  };

  if (!nickname || !avatar) {
    return null; // or you can return a default placeholder
  }

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md mb-4">
      <img src={avatar} alt={nickname} className="w-12 h-12 rounded-full mr-4" />
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-950">{nickname}</h2>
      </div>
      <button 
        onClick={handleLogout} 
        className="bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
