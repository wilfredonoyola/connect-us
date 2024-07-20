import React, { useEffect, useState } from 'react';
import UserList from '../components/UserList';


const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Home</h2>
      <UserList />
    </div>
  );
};

export default HomePage;
