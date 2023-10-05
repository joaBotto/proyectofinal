
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterByPrecio } from '../../redux/actions';

const PrecioFilter = () => {
  const dispatch = useDispatch();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [order, setOrder] = useState('asc');

  const handleFilter = () => {
    dispatch(filterByPrecio(parseInt(minPrice), parseInt(maxPrice), order));
  };

  return (
    <div>
      <label>Orden por Precio:</label>
      <input type="number" placeholder="Mínimo" onChange={(e) => setMinPrice(e.target.value)} />
      <input type="number" placeholder="Máximo" onChange={(e) => setMaxPrice(e.target.value)} />
      <select onChange={(e) => setOrder(e.target.value)}>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
      <button onClick={handleFilter}>Filtrar</button>
    </div>
  );
};

export default PrecioFilter;

