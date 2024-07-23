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
  targetUser: { nickname: string };
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
    <div className="absolute bottom-3  w-full bg-gray-900 p-4 flex items-center justify-center space-x-4 ">
      <button 
        onClick={toggleCamera} 
        className={`p-2 rounded ${isCameraOn ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
      >
        {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
      </button>
      <button 
        onClick={toggleMicrophone} 
        className={`p-2 rounded ${isMicrophoneOn ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
      >
        {isMicrophoneOn ? 'Turn Off Microphone' : 'Turn On Microphone'}
      </button>
      {!isInCall && !isCalling && (
        <>
          <button 
            onClick={() => callUser('audio')} 
            className="bg-blue-500 text-white p-2 rounded"
          >
            Call Audio
          </button>
          <button 
            onClick={() => callUser('video-audio')} 
            className="bg-blue-500 text-white p-2 rounded"
          >
            Call Video
          </button>
        </>
      )}
      {isCalling && (
        <>
          <p className="text-blue-500">Calling {targetUser.nickname}...</p>
          <button 
            onClick={cancelCall} 
            className="bg-red-500 text-white p-2 rounded"
          >
            Cancel Call
          </button>
        </>
      )}
      {isInCall && (
        <button 
          onClick={endCall} 
          className="bg-red-500 text-white p-2 rounded"
        >
          End Call
        </button>
      )}
    </div>
  );
};

export default Controls;
