'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import VideoCall from 'app/components/VideoCall';
import UserProfile from 'app/components/UserProfile';

const RoomPage: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;

  if (!id) {
    return <div>Loading...</div>;
  }

  // Dummy data for the target user
  const targetUser = {
    peerId: id,
    nickname: 'User',  // You can fetch or pass the real nickname here
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'  // You can fetch or pass the real avatar URL here
  };

  return (
    <div className="container mx-auto p-4">
      <UserProfile />
      <h2 className="text-2xl font-bold mb-4">Room {id}</h2>
      <VideoCall targetUser={targetUser} />
    </div>
  );
};

export default RoomPage;
