'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../../share/types'


// Generate a fake list of users for testing
const fakeUsers: User[] = [
  { id: '1', nickname: 'User1', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', nickname: 'User2', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: '3', nickname: 'User3', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: '4', nickname: 'User4', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
];

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Use the fake users instead of real-time connection
    setUsers(fakeUsers);
  }, []);


  const handleCall = (user: User) => {
    router.push(`/room/${user.id}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img src={user.avatar} alt={user.nickname} width="50" className="rounded-full mr-4" />
              <span>{user.nickname}</span>
            </div>
            <button 
              onClick={() => handleCall(user)} 
              className="bg-green-500 text-white p-2 rounded"
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
