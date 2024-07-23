'use client';

import React from 'react';

interface ControlsProps {
  isCameraOn: boolean;
  isMicrophoneOn: boolean;
  isInCall: boolean;
  isCalling: boolean;
  toggleCamera: () => void;
  toggleMicrophone: () => void;
  callUser: (type: 'audio' | 'video-audio') => void;
  cancelCall: () => void;
  endCall: () => void;
  targetUser: { peerId: string; nickname: string; avatar: string };
}

const Controls: React.FC<ControlsProps> = ({
  isCameraOn,
  isMicrophoneOn,
  isInCall,
  isCalling,
  toggleCamera,
  toggleMicrophone,
  callUser,
  cancelCall,
  endCall,
  targetUser,
}) => {
  return (
    <div className="absolute bottom-8 flex justify-center space-x-4">
      <button onClick={toggleCamera} className="bg-blue-500 text-white p-2 rounded">
        {isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
      </button>
      <button onClick={toggleMicrophone} className="bg-blue-500 text-white p-2 rounded">
        {isMicrophoneOn ? 'Turn Microphone Off' : 'Turn Microphone On'}
      </button>
      {!isInCall && !isCalling && (
        <>
          <button onClick={() => callUser('audio')} className="bg-green-500 text-white p-2 rounded">
            Call Audio
          </button>
          <button onClick={() => callUser('video-audio')} className="bg-green-500 text-white p-2 rounded">
            Call Video
          </button>
        </>
      )}
      {isInCall && (
        <button onClick={endCall} className="bg-red-500 text-white p-2 rounded">
          End Call
        </button>
      )}
      {isCalling && (
        <button onClick={cancelCall} className="bg-red-500 text-white p-2 rounded">
          Cancel Call
        </button>
      )}
    </div>
  );
};

export default Controls;
