import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../../Footer/Footer";
import Container from "@mui/material/Container";
import Paginado from "../../Paginado/paginado";
import CardsAdmin from "../../Cards/CardsAdmin";
import { filters } from "../../../redux/actions";
import NavBarAdmin from "../NavBar/NavBarAdmin";

export default function HomeAdmin() {
  const properties = useSelector((state) => state.properties);
  console.log("Soy prop en el homeAdmin", properties);

  // FILTROS
  const [type, setType] = useState("");
  const [orderPrice, setOrderPrice] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    if (name === "type") {
      setType(event.target.value);
      dispatch(filters(event.target.value, orderPrice));
    }
    if (name === "price") {
      setOrderPrice(event.target.value);
      dispatch(filters(type, event.target.value));
    }
  };

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const maxPage = Math.ceil(properties.length / perPage);

  useEffect(() => {
    setPage(1);
  }, [properties]);

  const currentPageData = properties.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className="mt-5 mx-0">
      <NavBarAdmin/>
     

         {/* FILTROS */}

         <div className="bg-white shadow py-2 w-1/3 rounded-full absolute top-[350px] left-[50%] transform translate-x-[-50%] -translate-y-[-50%]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xl font-semibold text-blue flex items-center justify-center space-x-4">
            <select
              onChange={handleChange}
              name="type"
              className="px-3 py-1 w-full rounded-full"
            >
              <option value="default">Search by type</option>
              <option value="Appartment">Appartment</option>
              <option value="House">House</option>
              <option value="Horizontal Property">Horizontal Property</option>
            </select>
            <select
              onChange={handleChange}
              name="price"
              className="px-3 py-1 w-full rounded-full"
            >
              <option value="default">Search by price</option>
              <option value="-">Lowest to highest</option>
              <option value="+">Highest to lowest</option>
            </select>
          </p>
        </div>
      </div>

      <Paginado
        page={page}
        setPage={setPage}
        maxPage={maxPage}
        products={properties}
      />

      <div className="p-4">
        <CardsAdmin properties={currentPageData} />
      </div>

      <Container className="flex justify-center bg-white rounded-full p-4 shadow-md">
        <Paginado
          page={page}
          setPage={setPage}
          maxPage={maxPage}
          products={properties}
        />
      </Container>

      <div className="p-0">
        <Footer />
      </div>
    </div>
  );
}
