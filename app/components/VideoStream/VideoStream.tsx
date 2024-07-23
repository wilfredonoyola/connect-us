'use client';

import React, { useEffect, useRef } from 'react';

interface VideoStreamProps {
  stream: MediaStream | null;
  isLocal: boolean;
  isCameraOn: boolean;
  avatar: string;
  nickname: string;
}

const VideoStream: React.FC<VideoStreamProps> = ({ stream, isLocal, isCameraOn, avatar, nickname }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden">
      {isCameraOn ? (
        <video ref={videoRef} autoPlay muted={isLocal} className="w-full h-full object-cover" />
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <img src={avatar} alt="User Avatar" className="w-24 h-24 rounded-full" />
        </div>
      )}
      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded">{nickname}</div>
    </div>
  );
};

export default VideoStream;
