
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { filterByUbicacion } from '../../redux/actions';

const UbicacionFilter = () => {
  const dispatch = useDispatch();
  const [ubicacionOptions, setUbicacionOptions] = useState([]);
  const [selectedUbicacion, setSelectedUbicacion] = useState(null);
  const inmuebles = useSelector((state) => state.allproperties);

  useEffect(() => {
    const uniqueUbicaciones = Array.from(new Set(inmuebles.map((inmueble) => inmueble.address.city)));
    const formattedUbicaciones = uniqueUbicaciones.map((location) => ({
      value: location,
      label: location,
    }));

    
    setUbicacionOptions(formattedUbicaciones);
  }, [inmuebles]);


  const handleChange = (selectedOption) => {
    setSelectedUbicacion(selectedOption);
    dispatch(filterByUbicacion(selectedOption.value)); 
  };
  


  return (
    <div>
      <label>Filtrar por Ubicación:</label>
      <Select
        value={selectedUbicacion}
        onChange={handleChange}
        options={ubicacionOptions}
        isSearchable
        placeholder="Selecciona una ubicación"
      />
    </div>
  );
};

export default UbicacionFilter;
