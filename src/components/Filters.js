import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
// Opciones de color y categoría (definidos estáticamente)
const categories = ["Remeras", "Polleras", "Top Casual", "Jeans", "Pantalones", "Camperas y Buzos", "Zapatos", "Bikinis", "Deportivo", "Noche y Fiesta", "Marroquineria y Accesorios", "Electronica", "Otros"];
const colors = ["Negro", "Blanco", "Rojo", "Azul", "Rosa", "Marron", "Verde", "Violeta"];
const Filters = ({ setFilters }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    useEffect(() => {
        setFilters({ category: selectedCategory, color: selectedColor, sortOrder });
    }, [selectedCategory, selectedColor, sortOrder, setFilters]);
    return (_jsx("div", { className: "flex  filters xs:p-1 xl:p-4 border rounded shadow-lg w-full justify-center aling-center", children: _jsxs("div", { className: 'flex xs:flex-col lg:flex-row md:flex-row xl:flex-row p-2', children: [_jsxs("div", { className: "mx-4 ", children: [_jsx("label", { className: "xs:text-xs mb-2 font-medium", children: "Filtrar por Categor\u00EDa:" }), _jsxs("select", { value: selectedCategory, onChange: (e) => setSelectedCategory(e.target.value), className: "border xl:p-2 rounded w-full", children: [_jsx("option", { value: "", children: "Seleccionar Categor\u00EDa" }), categories.map((category) => (_jsx("option", { value: category, children: category }, category)))] })] }), _jsxs("div", { className: "mx-4", children: [_jsx("label", { className: "xs:text-xs mb-2 font-medium", children: "Filtrar por Color:" }), _jsxs("select", { value: selectedColor, onChange: (e) => setSelectedColor(e.target.value), className: "border xl:p-2 rounded w-full", children: [_jsx("option", { value: "", children: "Seleccionar Color" }), colors.map((color) => (_jsx("option", { value: color, children: color }, color)))] })] }), _jsxs("div", { className: "mx-4", children: [_jsx("label", { className: "xs:text-xs block mb-2 font-medium", children: "Ordenar por Precio:" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => setSortOrder('asc'), className: `xs:p-1 xs:text-xs xl:px-4 xl:py-2 border rounded ${sortOrder === 'asc' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`, children: "Precio: Bajo a Alto" }), _jsx("button", { onClick: () => setSortOrder('desc'), className: `xs:p-1 xs:text-xs xl:px-4 xl:py-2 border rounded ${sortOrder === 'desc' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`, children: "Precio: Alto a Bajo" })] })] })] }) }));
};
export default Filters;
