import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {orderByResena } from '.../redux/actions';

function FilterResena() {
  const dispatch = useDispatch()
  const [filterWindowVisibility, setFilterWindowVisibility] = useState(false)

  const handleFilterClick = (e) => {
    if (!filterWindowVisibility) setFilterWindowVisibility(!filterWindowVisibility)
    //si tocas fuera de la ventana o tocas el apply btn se cierra
    else if (e.target.id === 'background' || e.target.id === 'applyBtn') setFilterWindowVisibility(!filterWindowVisibility)
  }

  const [estadolocal, setEstadolocal] = useState("")

  const handleFilterByCategory = (e) => setEstadolocal(e.target.value)

  const handleApply = (e) => {
    handleFilterClick(e)
    if(!estadolocal) return
    dispatch(orderByResena(estadolocal))
  }

  return (
    <>
      {/* FILTER BUTTON */}
      <button onClick={handleFilterClick} className='filter-btn btn d-flex align-items-center justify-content-between'>
        Filter by ★
        <i className="ms-2 bi bi-sliders"></i>
      </button>

      {/* WINDOW */}
      {filterWindowVisibility && <div id='background' onClick={handleFilterClick} className='filter-window-background'>
        <div className='filter-window d-flex flex-column align-items-start p-4 p-sm-5'>
          <p className='fs-5'>Filter by...</p>

          <p>Puntiacion</p>
          <select onChange={handleFilterByCategory} defaultValue='DEFAULT' className="form-select">
            <option value='DEFAULT' disabled>--select Puntuacion--</option>
            <option value="5" >★★★★★</option>
            <option value="4" >★★★★</option>
            <option value="3" >★★★</option>
            <option value="2" >★★</option>
            <option value="1" >★</option>
          </select>

          <button id='applyBtn' onClick={handleApply} type="button" className="btn btn-primary mt-4">Apply</button>
        </div>
      </div>}
    </>
  );
}

export default FilterResena;