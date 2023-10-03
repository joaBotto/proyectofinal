
import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import Footer from "../../components/Footer/Footer";
import Container from '@mui/material/Container';
import Paginado from "../../components/Paginado/paginado";
import Cards from "../../components/Cards/Cards"

export default function Home() {
  

const properties = useSelector(state => state.properties)
console.log("Soy prop en el home", properties)


useEffect(()=>{
	setPage(1)
},[properties])
  
  
	const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(8)
    const maxPage = Math.ceil(properties.length / perPage)
	


	return (
		<div>
		
			<div>
                <Cards properties={properties}/>
            </div>
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
