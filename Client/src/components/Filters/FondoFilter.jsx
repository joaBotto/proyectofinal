import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterByFondo } from '../../redux/actions';

const FondoFilter = () => {
  const dispatch = useDispatch();

  const handleChange = (hasFondo) => {
    dispatch(filterByFondo(hasFondo === 'true'));
  };

  return (
    <div>
      <label>Tiene Fondo:</label>
      <select onChange={(e) => handleChange(e.target.value)}>
        <option value="true">Sí</option>
        <option value="false">No</option>
      </select>
    </div>
  );
};

export default FondoFilter;