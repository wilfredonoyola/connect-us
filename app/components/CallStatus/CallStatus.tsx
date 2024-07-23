'use client';

import React from 'react';

interface CallStatusProps {
  isCalling: boolean;
  targetUser: { nickname: string };
  cancelCall: () => void;
}

const CallStatus: React.FC<CallStatusProps> = ({ isCalling, targetUser, cancelCall }) => {
  if (!isCalling) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center space-y-4 p-4 rounded-lg">
      <h3 className="text-white text-lg">Calling {targetUser.nickname}...</h3>
      <button onClick={cancelCall} className="bg-red-500 text-white p-2 rounded">
        Cancel Call
      </button>
    </div>
  );
};

export default CallStatus;
