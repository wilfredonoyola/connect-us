'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from 'app/share/types';

// Generate a fake list of users for testing
const fakeUsers: User[] = [
  { id: '1', nickname: 'User1', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', status: 'available' },
  { id: '2', nickname: 'User2', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', status: 'busy' },
  { id: '3', nickname: 'User3', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', status: 'available' },
  { id: '4', nickname: 'User4', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', status: 'busy' },
];

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Use the fake users instead of real-time connection
    setUsers(fakeUsers);
  }, []);

  const handleCall = (user: User) => {
    if (user.status === 'available') {
      router.push(`/room/${user.id}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nickname');
    localStorage.removeItem('avatar');
    router.push('/');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img src={user.avatar} alt={user.nickname} width="50" className="rounded-full mr-4" />
              <span className="font-semibold">{user.nickname}</span>
              <span className={`ml-2 text-sm ${user.status === 'available' ? 'text-green-500' : 'text-red-500'}`}>
                {user.status === 'available' ? 'Available' : 'In Call'}
              </span>
            </div>
            <button 
              onClick={() => handleCall(user)} 
              className={`p-2 rounded ${user.status === 'available' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white cursor-not-allowed'}`}
              disabled={user.status !== 'available'}
            >
              Call
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
