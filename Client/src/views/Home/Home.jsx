import React  from "react";
import {useSelector} from "react-redux";
import Container from '@mui/material/Container';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Paginado from "../../components/Paginado/paginado";
import UbicacionFilter from '../../components/Filtros/UbicacionFilter';


const Home = () => {
  const inmuebles = useSelector((state) => state.inmuebles);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(8);
  const maxPage = Math.ceil(inmuebles.length / perPage);

  return (
    <div>
      <NavBar />
      <UbicacionFilter />
      {/* Renderiza los demás filtros aquí */}
      <Footer />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          bgcolor: 'background.paper',
          borderRadius: 1,
          p: 1,
        }}
      >
        <Paginado
          page={page}
          setPage={setPage}
          maxPage={maxPage}
          products={inmuebles}
        />
      </Container>
    </div>
  );
};

export default Home;