import React, { useState, useEffect } from 'react';

// Opciones de color y categoría (definidos estáticamente)
const categories = ["Remeras","Polleras", "Top Casual", "Jeans", "Pantalones", "Camperas y Buzos", "Zapatos", "Bikinis", "Deportivo", "Noche y Fiesta","Marroquineria y Accesorios", "Electronica", "Otros"];
const colors = ["Negro", "Blanco", "Rojo", "Azul", "Rosa", "Marron", "Verde","Violeta"];

interface FiltersProps {
  setFilters: React.Dispatch<React.SetStateAction<{ category: string; color: string; sortOrder: 'asc' | 'desc'; }>>;
}

const Filters: React.FC<FiltersProps> = ({ setFilters }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setFilters({ category: selectedCategory, color: selectedColor, sortOrder });
  }, [selectedCategory, selectedColor, sortOrder, setFilters]);

  return (
    <div className="flex  filters xs:p-1 xl:p-4 border rounded shadow-lg w-full justify-center aling-center">
      <div className='flex xs:flex-col lg:flex-row md:flex-row xl:flex-row p-2'>

      <div className="mx-4 ">
        <label className="xs:text-xs mb-2 font-medium">Filtrar por Categoría:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border xl:p-2 rounded w-full"
        >
          <option value="">Seleccionar Categoría</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mx-4">
        <label className="xs:text-xs mb-2 font-medium">Filtrar por Color:</label>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="border xl:p-2 rounded w-full"
        >
          <option value="">Seleccionar Color</option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <div className="mx-4">
        <label className="xs:text-xs block mb-2 font-medium">Ordenar por Precio:</label>
        <div className="flex gap-2">
          <button
            onClick={() => setSortOrder('asc')}
            className={`xs:p-1 xs:text-xs xl:px-4 xl:py-2 border rounded ${sortOrder === 'asc' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          >
            Precio: Bajo a Alto
          </button>
          <button
            onClick={() => setSortOrder('desc')}
            className={`xs:p-1 xs:text-xs xl:px-4 xl:py-2 border rounded ${sortOrder === 'desc' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          >
            Precio: Alto a Bajo
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Filters;
