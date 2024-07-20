'use client';

import React, { useState } from 'react';

interface ChatMessage {
  sender: string;
  message: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'Me', message: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Chat</h2>
      <div className="h-64 overflow-y-scroll mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === 'Me' ? 'text-right' : 'text-left'}`}>
            <span className="font-bold">{msg.sender}: </span>{msg.message}
          </div>
        ))}
      </div>
      <div className="flex">
        <input 
          type="text" 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          className="border border-gray-300 p-2 rounded w-full mr-2"
        />
        <button 
          onClick={handleSendMessage} 
          className="bg-blue-500 text-white p-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
