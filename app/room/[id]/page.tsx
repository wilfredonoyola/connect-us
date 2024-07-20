'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Chat from '../../components/Chat';
import VideoCall from '../../components/VideoCall';

const RoomPage: React.FC = () => {
  const { id } = useParams();
  console.log('Room ID:', id);

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Room {id}</h2>
      <VideoCall targetUser={{ peerId: id as string, nickname: 'User' }} />
      <Chat />
    </div>
  );
};

export default RoomPage;
