import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderByUbicacion,filterByPrecio,filterByPileta,filterByFondo,filterByCategoria } from '.../redux/actions';

const LocationFilter = () => {//permite a los usuarios seleccionar una ubicación. Cuando el usuario selecciona una ubicación, se dispara una acción Redux llamada orderByUbicacion , que filtra las propiedades en función de la ubicación seleccionada. El componente PropertyList muestra las propiedades filtradas.
  const [selectedLocation, setSelectedLocation] = useState('');
  const dispatch = useDispatch();
  const availableLocations = useSelector((state) => state.filteredData);
  const [ selectprice, setSelectprice ]=useState(`minPrice`, `maxPrice`)
  const [pool, setPool] = useState(false); // Estado para filtrar por piscina
  const [backyard, setBackyard] = useState(false); // Estado para filtrar por fondo
  const [selectedSorting, setSelectedSorting] = useState('asc'); // Inicialmente, ordenar de menor a mayor
  const [currentPage, setCurrentPage] = useState(1);//almacena el número de página actual


  const handleLocationChange = (e) => {
    const ubicacion = e.target.value;
    setSelectedLocation(ubicacion);// Esta acción filtrará las propiedades por la ubicación seleccionada.
    dispatch(orderByUbicacion(ubicacion));
    dispatch (filterByPrecio(selectprice))
    dispatch (filterByPileta(pool))
    dispatch (filterByFondo(backyard))
    setCurrentPage(1);
    
  };

//************************************************************************************************ */
  const handlePoolChange = (e) => {
    setPool(e.target.checked);
    // Disparar acción para filtrar por piscina con valor e.target.checked
    dispatch(orderByUbicacion(availableLocations));
    dispatch (filterByPrecio(selectprice))
    dispatch (filterByPileta(e.target.checked))
    dispatch (filterByFondo(backyard))
    setCurrentPage(1);
  };
  
  const handleBackyardChange = (e) => {
    setBackyard(e.target.checked);
    // Disparar acción para filtrar por fondo con valor e.target.checked
    dispatch(orderByUbicacion(availableLocations));
    dispatch (filterByPrecio(selectprice))
    dispatch (filterByPileta(pool))
    dispatch (filterByFondo(e.target.checked))
    setCurrentPage(1);
  };
  //*********************************************************************************************** */
  const handleSortingChange = (e) => {
    const sorting = e.target.value;
    setSelectedSorting(sorting);
    // Disparar acción para cambiar el ordenamiento con valor 'asc' o 'desc'
    dispatch(orderByUbicacion(availableLocations));
    dispatch (filterByPrecio(sorting))
    dispatch (filterByPileta(pool))
    dispatch (filterByFondo(e.target.checked))
    setCurrentPage(1);
  
  };

  


  return (
    <div>
      <select onChange={handleLocationChange} value={selectedLocation}>
        <option value="">Todas las ubicaciones</option>
        {availableLocations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
        <label>
      Piscina:
      <input type="checkbox" checked={pool} onChange={handlePoolChange} />
    </label>
    <label>
      Fondo:
      <input type="checkbox" checked={backyard} onChange={handleBackyardChange} />
    </label>
      </select>
      <label>
        Ordenar por Precio:
        <select onChange={handleSortingChange} value={selectedSorting}>
          <option value="asc">Menor a Mayor</option>
          <option value="desc">Mayor a Menor</option>
        </select>
      </label>
    </div>
  );
  
};


export default LocationFilter;
