import React from 'react';
import spinner from '../assets/spinner.gif'; 

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <img src={spinner} alt="Loading..." className="justify-center w-20 h-20" />
    </div>
  );
};

export default Loader;
