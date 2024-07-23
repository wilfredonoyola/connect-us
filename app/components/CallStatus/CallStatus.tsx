import React from 'react';

interface CallStatusProps {
  isCalling: boolean;
  targetUser: { nickname: string };
  cancelCall: () => void;
}

const CallStatus: React.FC<CallStatusProps> = ({ isCalling, targetUser, cancelCall }) => {
  if (!isCalling) return null;

  return (
    <div className="flex flex-col items-center">
      <p className="text-blue-500">Calling {targetUser.nickname}...</p>
      <button 
        onClick={cancelCall} 
        className="bg-red-500 text-white p-2 rounded w-full mt-4"
      >
        Cancel Call
      </button>
    </div>
  );
};

export default CallStatus;
