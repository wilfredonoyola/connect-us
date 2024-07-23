'use client';

import React, { useEffect, useRef, useState } from 'react';
import Peer, { MediaConnection } from 'peerjs';
import VideoStream from '../VideoStream';
import Controls from '../Controls';
import IncomingCallPopup from '../IncomingCallPopup';
import CallStatus from '../CallStatus';

interface VideoCallProps {
  targetUser: { peerId: string; nickname: string; avatar: string };
}

const VideoCall: React.FC<VideoCallProps> = ({ targetUser }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [incomingCall, setIncomingCall] = useState<MediaConnection | null>(null);
  const [outgoingCall, setOutgoingCall] = useState<MediaConnection | null>(null);
  const [isInCall, setIsInCall] = useState<boolean>(false);
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState<boolean>(false);
  const [callType, setCallType] = useState<'audio' | 'video-audio'>('video-audio');

  const peerInstance = useRef<Peer | null>(null);

  useEffect(() => {
    if (!peerInstance.current) {
      peerInstance.current = new Peer();
    }

    peerInstance.current.on('open', (id) => {
      console.log('PeerJS connected with ID:', id);
    });

    peerInstance.current.on('call', (call: MediaConnection) => {
      setIncomingCall(call);
    });

    return () => {
      peerInstance.current?.destroy();
    };
  }, []);

  const getUserMedia = async (constraints: MediaStreamConstraints): Promise<MediaStream | null> => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      return mediaStream;
    } catch (error) {
      console.error('Error accessing media devices.', error);
      return null;
    }
  };

  const callUser = async (type: 'audio' | 'video-audio') => {
    setCallType(type);
    const mediaStream = await getUserMedia(type === 'video-audio' ? { video: true, audio: true } : { audio: true });
    if (mediaStream && peerInstance.current) {
      const call = peerInstance.current.call(targetUser.peerId, mediaStream);
      if (call) {
        setOutgoingCall(call);
        setIsCalling(true);
        call.on('stream', (remoteStream: MediaStream) => {
          setRemoteStream(remoteStream);
          setIsInCall(true);
          setIsCalling(false);
        });
        call.on('close', () => {
          setIsInCall(false);
          setRemoteStream(null);
          setOutgoingCall(null);
          setIsCalling(false);
        });
      } else {
        console.error('Failed to initiate call.');
      }
    } else {
      console.error('Media stream or peer instance is not available.');
    }
  };

  const answerCall = async () => {
    const mediaStream = await getUserMedia(callType === 'video-audio' ? { video: true, audio: true } : { audio: true });
    if (incomingCall && mediaStream) {
      incomingCall.answer(mediaStream);
      incomingCall.on('stream', (remoteStream: MediaStream) => {
        setRemoteStream(remoteStream);
        setIsInCall(true);
      });
      setIncomingCall(null);
    }
  };

  const declineCall = () => {
    if (incomingCall) {
      incomingCall.close();
      setIncomingCall(null);
    }
  };

  const cancelCall = () => {
    if (outgoingCall) {
      outgoingCall.close();
      setOutgoingCall(null);
      setIsCalling(false);
    }
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (peerInstance.current) {
      peerInstance.current.destroy();
    }
    setStream(null);
    setRemoteStream(null);
    setIsInCall(false);
    setIsCalling(false);
  };

  const toggleCamera = async () => {
    if (isCameraOn) {
      stream?.getVideoTracks().forEach(track => track.stop());
      setIsCameraOn(false);
    } else {
      const mediaStream = await getUserMedia({ video: true, audio: isMicrophoneOn });
      if (mediaStream) {
        if (stream) {
          stream.addTrack(mediaStream.getVideoTracks()[0]);
        } else {
          setStream(mediaStream);
        }
        setIsCameraOn(true);
      }
    }
  };

  const toggleMicrophone = async () => {
    if (isMicrophoneOn) {
      stream?.getAudioTracks().forEach(track => track.stop());
      setIsMicrophoneOn(false);
    } else {
      const mediaStream = await getUserMedia({ audio: true, video: isCameraOn });
      if (mediaStream) {
        if (stream) {
          stream.addTrack(mediaStream.getAudioTracks()[0]);
        } else {
          setStream(mediaStream);
        }
        setIsMicrophoneOn(true);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center p-12">
      <div className="relative w-full h-full flex gap-4">
        <div className="flex-1 flex items-center  justify-center">
          <VideoStream
            stream={stream}
            isLocal={true}
            isCameraOn={isCameraOn}
            avatar={targetUser.avatar}
            nickname="You"
          />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <VideoStream
            stream={remoteStream}
            isLocal={false}
            isCameraOn={!!remoteStream}
            avatar={targetUser.avatar}
            nickname={targetUser.nickname}
          />
        </div>
      </div>
      <Controls
        isCameraOn={isCameraOn}
        isMicrophoneOn={isMicrophoneOn}
        isInCall={isInCall}
        isCalling={isCalling}
        toggleCamera={toggleCamera}
        toggleMicrophone={toggleMicrophone}
        callUser={callUser}
        cancelCall={cancelCall}
        endCall={endCall}
        targetUser={targetUser}
      />
      <IncomingCallPopup
        incomingCall={incomingCall}
        answerCall={answerCall}
        declineCall={declineCall}
      />
      <CallStatus
        isCalling={isCalling}
        targetUser={targetUser}
        cancelCall={cancelCall}
      />
    </div>
  );
};

export default VideoCall;
