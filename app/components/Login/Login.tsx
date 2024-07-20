'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [nickname, setNickname] = useState<string>('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = () => {
    if (nickname) {
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('avatar', avatar || '');
      router.push('/home');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input 
        type="text" 
        placeholder="Nickname" 
        value={nickname} 
        onChange={(e) => setNickname(e.target.value)} 
        className="border border-gray-300 p-2 rounded mb-4 w-full text-black"
      />
      <input 
        type="file" 
        onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))} 
        className="mb-4"
      />
      <button 
        onClick={handleLogin} 
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
