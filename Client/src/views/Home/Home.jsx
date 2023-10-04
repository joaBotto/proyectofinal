import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Container from '@mui/material/Container';
import PaginationButtons from "../../components/Paginado/paginado"
import Cards from "../../components/Cards/Cards";

export default function Home() {
	const allProperties = useSelector((state) => state.properties);
	const filteredProperties = useSelector((state) => state.filteredData);
	const [page, setPage] = useState(1);
	const perPage = 8;
    const maxPage = Math.ceil(filteredProperties.length / perPage)


  const currentPageData = filteredProperties.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    setPage(1);
  }, [filteredProperties]);
  
		
	  
		return (
			<div className="h-screen bg-gray-100 mt-5">
			  <h1 className="absolute text-5xl font-bold text-fuchsia-950 mt-10 top-40 left-7 leading-[1.2]">
				FIND A HOME THAT
				<br /> SUITS YOU
			  </h1>
			  <p className="absolute text-lg font-semibold text-white top-[320px] left-7">
				+200 PROPERTIES
			  </p>
			  <p className="absolute text-lg font-semibold text-white mt-6 top-[320px] left-7">
				+400 HAPPY CUSTOMERS
			  </p>
		
			  <div className="p-4">
				<Cards properties={currentPageData} />
			  </div>
			  <Container className="flex justify-center bg-white rounded-full p-4 shadow-md">
			  <PaginationButtons
          page={page}
          setPage={setPage}
          maxPage={maxPage}
          data={filteredProperties}
        />
			  </Container>
			  <div className="p-4">
				<Footer />
			  </div>
			</div>
		  );
		}