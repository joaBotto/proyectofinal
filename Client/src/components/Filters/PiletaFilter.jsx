import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterByPileta } from '../../redux/actions';

const PiletaFilter = () => {
  const dispatch = useDispatch();

  const handleChange = (hasPileta) => {
    dispatch(filterByPileta(hasPileta === 'true'));
  };

  return (
    <div>
      <label>Tiene Pileta:</label>
      <select onChange={(e) => handleChange(e.target.value)}>
        <option value="true">Sí</option>
        <option value="false">No</option>
      </select>
    </div>
  );
};

export default PiletaFilter;