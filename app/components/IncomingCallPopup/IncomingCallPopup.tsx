import React from 'react';
import { MediaConnection } from 'peerjs';

interface IncomingCallPopupProps {
  incomingCall: MediaConnection | null;
  answerCall: () => void;
  declineCall: () => void;
}

const IncomingCallPopup: React.FC<IncomingCallPopupProps> = ({ incomingCall, answerCall, declineCall }) => {
  if (!incomingCall) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center space-y-4 p-4 rounded-lg">
      <h3 className="text-white text-lg">Incoming call from {incomingCall.peer}</h3>
      <div className="flex space-x-4">
        <button 
          onClick={answerCall} 
          className="bg-green-500 text-white p-2 rounded"
        >
          Answer
        </button>
        <button 
          onClick={declineCall} 
          className="bg-red-500 text-white p-2 rounded"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default IncomingCallPopup;
