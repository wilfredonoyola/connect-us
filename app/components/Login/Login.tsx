'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [nickname, setNickname] = useState<string>('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = () => {
    if (nickname && avatar) {
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('avatar', avatar);
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
        setAvatar(fileURL);
        setAvatarPreview(fileURL);
        setError(null); // Clear any previous errors
      } else {
        setError('Only PNG and JPG files are allowed.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Welcome to Connect Us</h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Nickname" 
            value={nickname} 
            onChange={(e) => setNickname(e.target.value)} 
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input 
            type="file" 
            accept="image/png, image/jpeg" 
            onChange={handleFileChange} 
            className="w-full"
          />
        </div>
        {avatarPreview && (
          <div className="flex justify-center mb-4">
            <img 
              src={avatarPreview} 
              alt="Avatar Preview" 
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
            />
          </div>
        )}
        <button 
          onClick={handleLogin} 
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
