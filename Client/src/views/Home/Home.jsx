import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../components/Footer/Footer";
import { getProperty } from "../../redux/actions";
import Container from '@mui/material/Container';
import Paginado from "../../components/Paginado/paginado";

export default function Home() {

		const allProperties = useSelector((state) => state.properties);
		const filteredProperties = useSelector((state) => state.filteredData);
		const [currentPageData, setCurrentPageData] = useState([]);
		const [page, setPage] = useState(1);
		const perPage = 8;
	  
		useEffect(() => {
		  setPage(1);
		  setCurrentPageData(allProperties.slice(0, perPage));
		}, [allProperties, perPage]);
	  
		useEffect(() => {
		  setPage(1);
		  setCurrentPageData(filteredProperties.slice(0, perPage));
		}, [filteredProperties, perPage]);
	  
		const handlePageChange = (newPage) => {
		  const startIndex = (newPage - 1) * perPage;
		  const endIndex = startIndex + perPage;
		  setCurrentPageData(filteredProperties.slice(startIndex, endIndex));
		  setPage(newPage);
		};
	  
		const maxPage = Math.ceil(filteredProperties.length / perPage);
	  
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
           <Cards properties={filteredProperties} />
         </div>
          <Container className="flex justify-center bg-white rounded-full p-4 shadow-md">
		  <PaginationButtons
          page={page}
          setPage={handlePageChange}
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
