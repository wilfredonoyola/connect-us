'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';
import { getNickname, getAvatar, clearStorage } from '../../utils/storage';

const socket = io({
  path: '/api/socket',
});

const UserProfile: React.FC = () => {
  const router = useRouter();
  const [nickname, setNicknameState] = useState<string | null>(null);
  const [avatar, setAvatarState] = useState<string | null>(null);

  useEffect(() => {
    setNicknameState(getNickname());
    setAvatarState(getAvatar());
  }, []);

  const handleLogout = () => {
    socket.emit('setStatus', 'busy');
    clearStorage();
    socket.emit('logout');
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
