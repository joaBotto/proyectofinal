import * as React from 'react';
import Pagination from '@mui/material/Pagination';// Esto permite utilizar el componente de paginación de Material-UI en este archivo.
import Stack from '@mui/material/Stack';//. El componente Stack se utiliza para agrupar elementos con espaciado predefinido.


// global estate
const products = useSelector(state => state.inmuebles)
//local state
const [page, setPage] = useState(1)
const [currentData, setCurrentData] = useState([]);
const [count, setCount] = useState(0);
const limit = 10; // Asume el número de elementos por página que deseas mostrar

useEffect(() => {
    setCurrentData(inmuebles);
  }, [inmubles]);

      let n = Math.ceil(currentData / limit)
      setCount((page === 1 && currentData.length < limit) ? 1 : n)
      if (page > 1 && currentData.length === 0) {
        setPage(1);
      }
    
  
//render

// <Pagination page={page} count={count} setPage={n => { setPage(n) }} />









                                    //Este componente acepta las siguientes props
export default function PaginationButtons({spacing,page, setPage, maxPage, products }) {
    function handleChange(page) {
      setPage(page)
    }
    
    React.useEffect(() => { // cada vez que cambie la prop products., se llama a setPage(1) para establecer la página actual en 1. Esto asegura que cuando cambie la lista de productos, la página se reinicie a la primera página.
      setPage(1)
    },[products])
  
    return (//Crea un componente Stack con un espaciado igual a la prop spacing si está definida; de lo contrario, utiliza un espaciado predeterminado de 2.
        <Stack spacing={spacing?spacing:2} >
        <Pagination count={maxPage} onChange={(event, page) => handleChange(page)} defaultPage={1} page={page} showFirstButton showLastButton />
        </Stack>
    );
  }

  //onChange:se llama a la función handleChange con el número de página como argumento
//page: La página actual, que se toma de la prop




























// import React, { useEffect } from 'react'
// import {useDispatch, useSelector} from 'react-redux'
// import { getAllProducts,  } from ''



//  const Paginated = () => {
    
//     const dispatch=useDispatch()
//     const product = useSelector((state)=>state.products)
//   const [currentData, setCurrentData] = useState([]);//almacena los datos que se muestran actualmente en la página
//   const [currentPage, setCurrentPage] = useState(1);//almacena el número de página actual
//   const itemsPerPage = 10; // Asume el número de elementos por página que deseas mostrar
//   const totalPages = Math.ceil(currentData.length / itemsPerPage);//determina la cantidad total de páginas necesarias para mostrar todos los datos en función de la cantidad de elementos por página.

//     useEffect(()=>{
//         dispatch(getAllProducts())
//     },[dispatch])

//     // Obtener los elementos para la página actual
//   const startIndex = (currentPage - 1 ) * itemsPerPage;//Restamos 1 de currentPage para que la página 1 tenga un startIndex de 0, la página 2 tenga un startIndex de itemsPerPage, la página 3 tenga un startIndex de 2 * itemsPerPage, y así sucesivamente.

//   const endIndex = startIndex + itemsPerPage; //Sumamos para obtener el índice del elemento justo después del último elemento en la página actual.
  
//   const data = currentData.slice(startIndex, endIndex);

//   // Funciones para cambiar de página
//   const goToPreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);//disminuye el número de página actual si el usuario no está en la primera página
//     }
//   };

//   const goToNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);//aumenta el número de página actual si el usuario no está en la última página
//     }
//   };

//   const handlePageChange = (currentPage) => {//esta función se llama cuando se produce un cambio de página
//     setCurrentPage(currentPage);//actualiza el estado 
//   };
    
   
//   return (
//     <div>
//             <SearchBar onPageChange={handlePageChange} />
//           </div>
//            {data.length > 0 ? (
//             <div>
//                 <div>
//                   {data.map((item) => renderItem(item))}
//                   <div> {/* Controles de paginación */}
//                     <button
//                       onClick={goToPreviousPage}
//                       disabled={currentPage === 1}
//                     >
//                       Prev
//                     </button>
//                     <span>
//                       {currentPage} de {totalPages}
//                     </span>
//                     <button
//                       onClick={goToNextPage}
//                       disabled={endIndex >= currentData.length}
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//             </div>
//             )}
            
//             )
  

// };

// export default Paginated;