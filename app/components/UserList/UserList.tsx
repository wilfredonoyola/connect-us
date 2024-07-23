'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';
import { getNickname, getAvatar } from '../../utils/storage';

const socket = io({
  path: '/api/socket',
});

interface User {
  id: string;
  nickname: string;
  avatar: string;
  status: 'available' | 'busy';
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    const nickname = getNickname();
    const avatar = getAvatar();

    if (!nickname || !avatar) {
      router.push('/');
      return;
    }

    const updateUserList = (data: User[]) => {
      setUsers(data.filter(user => user.id !== socket.id));
    };

    socket.on('users', updateUserList);

    const user = {
      id: socket.id,
      nickname,
      avatar,
      status: 'available',
    };

    socket.on('connect', () => {
      socket.emit('login', user);
    });

    return () => {
      socket.off('users', updateUserList);
    };
  }, [router]);

  const handleCall = (user: User) => {
    router.push(`/room/${user.id}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-slate-900">Users</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No contacts available.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id} className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img src={user.avatar} alt={user.nickname} width="50" className="rounded-full mr-4" />
                <span>{user.nickname}</span>
                <span className={`ml-2 ${user.status === 'available' ? 'text-green-500' : 'text-red-500'}`}>
                  {user.status}
                </span>
              </div>
              <button 
                onClick={() => handleCall(user)} 
                className={`bg-${user.status === 'available' ? 'green' : 'gray'}-500 text-white p-2 rounded`}
                disabled={user.status !== 'available'}
              >
                Call
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
