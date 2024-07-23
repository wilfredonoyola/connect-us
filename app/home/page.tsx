import React from 'react';
import UserList from '../components/UserList';
import UserProfile from 'app/components/UserProfile';


const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
    <UserProfile />
    <h2 className="text-2xl font-bold mb-4">Home</h2>
    <UserList />
  </div>
  );
};

export default HomePage;
