import React from 'react';
import { useDispatch } from 'react-redux';
import { filterByCategoria } from '../../redux/actions';

const CategoriaFilter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    console.log('Selected value:', value);
    dispatch(filterByCategoria(value));
  };
  

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Filtrar por Categoría:</label>
      <select
        onChange={(e) => handleChange(e)}
        name="type"
        className="block w-full px-3 py-1 rounded-full">
        <option value="default">Filter by type</option>
        <option value="house">Casa</option>
        <option value="depto">Departamento</option>
        <option value="ph">PH</option>
      </select>
    </div>
  );
};

export default CategoriaFilter;