'use client';

import React, { useRef, useEffect, useState } from 'react';
import Peer from 'peerjs';

interface VideoCallProps {
  targetUser: { peerId: string; nickname: string };
}

const VideoCall: React.FC<VideoCallProps> = ({ targetUser }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const peerInstance = useRef<Peer | null>(null);

  useEffect(() => {
    // Initialize Peer instance only once
    if (!peerInstance.current) {
      peerInstance.current = new Peer();
    }

    const getUserMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = mediaStream;
        }
        setStream(mediaStream);
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };

    getUserMedia();

    peerInstance.current.on('open', (id) => {
      console.log('PeerJS connected with ID:', id);
    });

    peerInstance.current.on('call', (call) => {
      if (stream) {
        call.answer(stream);
        call.on('stream', (remoteStream) => {
          if (userVideoRef.current) {
            userVideoRef.current.srcObject = remoteStream;
          }
        });
      }
    });

    return () => {
      peerInstance.current?.destroy();
    };
  }, []);

  const callUser = () => {
    if (peerInstance.current && stream) {
      const call = peerInstance.current.call(targetUser.peerId, stream);
      call.on('stream', (remoteStream) => {
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = remoteStream;
        }
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Video Call with {targetUser.nickname}</h2>
      <div className="flex flex-col items-center">
        <video ref={myVideoRef} autoPlay muted className="w-full mb-4"></video>
        <video ref={userVideoRef} autoPlay className="w-full mb-4"></video>
        <button 
          onClick={callUser} 
          className="bg-blue-500 text-white p-2 rounded"
        >
          Call {targetUser.nickname}
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
