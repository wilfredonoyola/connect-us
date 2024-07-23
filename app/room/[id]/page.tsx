'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { io } from 'socket.io-client';
import VideoCall from 'app/components/VideoCall';
import UserProfile from 'app/components/UserProfile';
import { getNickname, getAvatar } from '../../utils/storage';

interface Caller {
  peerId: string;
  nickname: string;
  avatar: string;
}

const socket = io({
  path: '/api/socket',
});

const RoomPage: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const [incomingCall, setIncomingCall] = useState<Caller | null>(null);

  useEffect(() => {
    socket.on('incomingCall', (caller: Caller) => {
      setIncomingCall(caller);
    });

    return () => {
      socket.off('incomingCall');
    };
  }, []);

  if (!id) {
    return <div>Loading...</div>;
  }

  // Get the logged-in user from localStorage
  const loggedInUser = {
    id: socket.id as string,
    nickname: getNickname() || 'Unknown',
    avatar: getAvatar() || 'https://via.placeholder.com/150',
  };

  const handleAnswerCall = () => {
    setIncomingCall(null);
    // Implement the logic to answer the call
  };

  const handleDeclineCall = () => {
    setIncomingCall(null);
    // Implement the logic to decline the call
  };

  return (
    <div className="container mx-auto p-4">
      <UserProfile />
      <h2 className="text-2xl font-bold mb-4">Room {id}</h2>
      {incomingCall && (
        <div className="incoming-call-popup">
          <p>{incomingCall.nickname} is calling...</p>
          <button onClick={handleAnswerCall} className="bg-green-500 text-white p-2 rounded">Answer</button>
          <button onClick={handleDeclineCall} className="bg-red-500 text-white p-2 rounded">Decline</button>
        </div>
      )}
      <VideoCall targetUser={{ peerId: id, nickname: 'User', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' }} loggedInUser={loggedInUser} />
    </div>
  );
};

export default RoomPage;
