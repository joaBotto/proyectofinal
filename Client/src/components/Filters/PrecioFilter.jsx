import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterByPrecio } from '../../redux/actions';

const PrecioFilter = () => {
  const dispatch = useDispatch();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilter = () => {
    dispatch(filterByPrecio(parseInt(minPrice), parseInt(maxPrice)));
  };

  return (
    <div>
      <label>Filtrar por Precio:</label>
      <input type="number" placeholder="Mínimo" onChange={(e) => setMinPrice(e.target.value)} />
      <input type="number" placeholder="Máximo" onChange={(e) => setMaxPrice(e.target.value)} />
      <button onClick={handleFilter}>Filtrar</button>
    </div>
  );
};

export default PrecioFilter;