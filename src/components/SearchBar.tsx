// src/components/SearchBar.tsx
import React, { useState } from 'react';

interface SearchBarProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm }) => {
  const [title, setTitle] = useState<string>('');

  const handleSearch = () => {
    setSearchTerm(title);
  };

  return (
    <div className=" flex xl:m-3 xs:m-1 xl:justify-start xs:justify-center">
      <input
      className='bg-white mx-4 rounded-md p-3 xl:w-[300px] xs:w-[200px] xs:h-8'
        type="text"
        placeholder="Buscar por título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
      className=" px-1 text-white rounded-sm  text-center flex justify-center items-center"
       onClick={handleSearch}>
        <img 
        className='w-6 h-6'
        src="https://cdn.pixabay.com/photo/2015/12/14/20/35/magnifier-1093183_1280.png" alt="" />
       </button>
    </div>
  );
};

export default SearchBar;
