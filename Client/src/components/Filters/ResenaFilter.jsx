import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { orderByResena } from '../../redux/actions';

const ResenaFilter = () => {
  const dispatch = useDispatch();

  const handleChange = (puntuacion) => {
    dispatch(orderByResena(puntuacion));
  };

  return (
    <div>
      <label>Ordenar por Reseña:</label>
      <select onChange={(e) => handleChange(e.target.value)}>
        <option value="1">1 ★</option>
        <option value="2">2 ★★</option>
        <option value="3">3 ★★★</option>
        <option value="4">4 ★★★★</option>
        <option value="5">5 ★★★★★</option>
      </select>
    </div>
  );
};

export default ResenaFilter;