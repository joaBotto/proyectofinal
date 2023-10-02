import React  from "react";
import {useSelector} from "react-redux";
import Container from '@mui/material/Container';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Paginado from "../../components/Paginado/paginado";
// import LocationFilter from "../../components/Filters/LocationFilter";
// import FilterResena from "../../components/Filters/FilterResena.jsx"



export default function Home() {
	const inmuebles = useSelector((state) => state.inmuebles)
	const [page, setPage] = React.useState(1)
    const [perPage, setPerPage] = React.useState(8)
    const maxPage = Math.ceil(inmuebles.length / perPage)
	

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
                    products={inmuebles}
                    >
                </Paginado>
            </Container>
		</div>
	);
}
