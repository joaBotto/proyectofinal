import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterByCategoria } from '../../redux/actions';

const CategoriaFilter = () => {
  const dispatch = useDispatch();

  const handleChange = (categoria) => {
    dispatch(filterByCategoria(categoria));
  };

  return (
    <div>
      <label>Filtrar por Categoría:</label>
      <select onChange={(e) => handleChange(e.target.value)}>
        <option value="casa">Casa</option>
        <option value="departamento">Departamento</option>
        <option value="ph">PH</option>
      </select>
    </div>
  );
};

export default CategoriaFilter;