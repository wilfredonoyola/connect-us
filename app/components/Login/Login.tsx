'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setNickname, setAvatar } from '../../utils/storage';

const Login: React.FC = () => {
  const [nickname, setNicknameState] = useState<string>('');
  const [avatar, setAvatarState] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = () => {
    if (nickname && avatar) {
      setNickname(nickname);
      setAvatar(avatar);
      router.push('/home');
    } else {
      setError('Please provide both a nickname and an avatar.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type;
      if (fileType === 'image/png' || fileType === 'image/jpeg') {
        const fileURL = URL.createObjectURL(file);
        setAvatarState(fileURL);
        setAvatarPreview(fileURL);
        setError(null); // Clear any previous errors
      } else {
        setError('Only PNG and JPG files are allowed.');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <input 
        type="text" 
        placeholder="Nickname" 
        value={nickname} 
        onChange={(e) => setNicknameState(e.target.value)} 
        className="border border-gray-300 p-2 rounded mb-4 w-full text-black"
      />
      <input 
        type="file" 
        accept="image/png, image/jpeg" 
        onChange={handleFileChange} 
        className="mb-4"
      />
      {avatarPreview && (
        <div className="flex justify-center mb-4">
          <img 
            src={avatarPreview} 
            alt="Avatar Preview" 
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
      )}
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
