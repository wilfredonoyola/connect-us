import React, { useRef, useEffect } from 'react';

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
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
      {isCameraOn && stream ? (
        <video ref={videoRef} autoPlay muted={isLocal} className="w-full h-full object-cover" />
      ) : (
        <div className="flex flex-col items-center">
          <img src={avatar} alt={`${nickname}'s Avatar`} className="w-24 h-24 rounded-full mb-4" />
          <p className="text-gray-500">Camera is off</p>
        </div>
      )}
      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded">
        {isLocal ? 'You' : nickname}
      </div>
    </div>
  );
};

export default VideoStream;
