import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { orderByUbicacion } from '../../redux/actions';

const UbicacionFilter = () => {
  const dispatch = useDispatch();
  const [ubicacionOptions, setUbicacionOptions] = useState([]);
  const [selectedUbicacion, setSelectedUbicacion] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const inmuebles = useSelector((state) => state.inmuebles);

  useEffect(() => {
    // Obtener ubicaciones únicas desde los inmuebles
    const uniqueUbicaciones = Array.from(new Set(inmuebles.map((inmueble) => inmueble.ubicacion)));
    // Formatear las ubicaciones para react-select
    const formattedUbicaciones = uniqueUbicaciones.map((ubicacion) => ({
      value: ubicacion,
      label: ubicacion,
    }));
    setUbicacionOptions(formattedUbicaciones);
  }, [inmuebles]);

  const handleChange = (selectedOption) => {
    setSelectedUbicacion(selectedOption);
    dispatch(orderByUbicacion(selectedOption.value));
  };

  const handleInputChange = (input) => {
    setSearchInput(input);
    const filteredUbicaciones = ubicacionOptions.filter((option) =>
      option.label.toLowerCase().includes(input.toLowerCase())
    );
    setUbicacionOptions(filteredUbicaciones);
  };

  return (
    <div>
      <label>Filtrar por Ubicación:</label>
      <Select
        value={selectedUbicacion}
        onChange={handleChange}
        onInputChange={handleInputChange}
        options={ubicacionOptions}
        isSearchable
        placeholder="Selecciona o busca una ubicación"
      />
    </div>
  );
};

export default UbicacionFilter;