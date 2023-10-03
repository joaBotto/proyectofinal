
import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { getProperty } from "../../redux/actions";
import Container from '@mui/material/Container';
import Paginado from "../../components/Paginado/paginado";

export default function Home() {
  
const dispatch = useDispatch();
const properties = useSelector(state => state.properties)

useEffect(()=>{
	dispatch(getProperty())	
	},[dispatch])

useEffect(()=>{
	//// VOLVER A LA PAG 1 CUANDO CAMBIE EL ESTADO DE PROPERTIES
},[properties])
  
  
// 	const inmuebles = useSelector((state) => state.inmuebles)
// 	const [page, setPage] = React.useState(1)
//     const [perPage, setPerPage] = React.useState(8)
//     const maxPage = Math.ceil(inmuebles.length / perPage)
	

import UbicacionFilter from '../../components/Filtros/UbicacionFilter';


const Home = () => {
  const inmuebles = useSelector((state) => state.inmuebles);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(8);
  const maxPage = Math.ceil(inmuebles.length / perPage);

	return (
		<div>
			<div>
				<NavBar />
			</div>
			<div></div>
			<div>
				<Footer />
			</div>
			<Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    p: 1,
                }}>
                <Paginado
                    page={page}
                    setPage={setPage}
                    maxPage={maxPage}
                    products={properties}
                    >
                </Paginado>
            </Container>
		</div>
	);
}
