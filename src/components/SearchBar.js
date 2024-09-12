import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/SearchBar.tsx
import { useState } from 'react';
const SearchBar = ({ setSearchTerm }) => {
    const [title, setTitle] = useState('');
    const handleSearch = () => {
        setSearchTerm(title);
    };
    return (_jsxs("div", { className: " flex xl:m-3 xs:m-1 xl:justify-start xs:justify-center", children: [_jsx("input", { className: 'bg-white mx-4 rounded-md p-3 xl:w-[300px] xs:w-[200px] xs:h-8', type: "text", placeholder: "Buscar por t\u00EDtulo", value: title, onChange: (e) => setTitle(e.target.value) }), _jsx("button", { className: " px-1 text-white rounded-sm  text-center flex justify-center items-center", onClick: handleSearch, children: _jsx("img", { className: 'w-6 h-6', src: "https://cdn.pixabay.com/photo/2015/12/14/20/35/magnifier-1093183_1280.png", alt: "" }) })] }));
};
export default SearchBar;
