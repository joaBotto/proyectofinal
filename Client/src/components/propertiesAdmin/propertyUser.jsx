import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Container from "@mui/material/Container";
import Paginado from "../../components/Paginado/paginado";
import Cards from "../../components/Cards/CardsAdmin";
import { FrownOutlined } from "@ant-design/icons";
import { filters, getProperty } from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Postuser() {
  const currentUser = useSelector((state) => state.user);
  const properties = useSelector((state) => state.properties);

  const dispatch = useDispatch();
  const [noResults, setNoResults] = useState(false);
  const [type, setType] = useState("default");
  const [orderPrice, setOrderPrice] = useState("default");
  const [search, setSearch] = useState("");

  useEffect(()=>{
    dispatch(getProperty())
    },[])

  useEffect(() => {
    setPage(1);
  }, [properties]);

  const handleChange = (event) => {
    const name = event.target.name;
    setNoResults(false);

    if (name === "searchBar") {
      setSearch(event.target.value);
      dispatch(filters(type, orderPrice, event.target.value));
      // console.log("soy el searchBar", event.target.value)
    }
    if (name === "type") {
      setType(event.target.value);
      dispatch(filters(event.target.value, orderPrice, search));
      // console.log("SOY LOS FILTROS", type, orderPrice, search)
    }
    if (name === "price") {
      setOrderPrice(event.target.value);
      dispatch(filters(type, event.target.value, search));
      // console.log("SOY LOS FILTROS", type, orderPrice, search)
    }
  };

  const [page, setPage] = useState(1);
  const perPage = 8;
  const maxPage = Math.ceil(properties.length / perPage);

  console.log("Usuario actual:", currentUser);
  console.log("Soy prop en el home", properties);

  // Obtener todos los IDs de propiedad del usuario
  const userPropertyIds = currentUser.properties; // Suponiendo que user.properties contiene un array de IDs

  console.log("IDs de propiedades del usuario:", userPropertyIds);

  // Filtrar las propiedades que coinciden con los IDs en userPropertyIds
  const userProperties = properties.filter((property) =>
    userPropertyIds.includes(property._id)
  );
  console.log("Propiedades del usuario:", userProperties);

  // Renderizar solo cuando userProperties no esté vacío
  return (
    <div className="mt-5 mx-0">
      <div className="bg-transparent flex flex-row justify-end py-2 w-full rounded-full">
        <div className="w-full absolute top-[400px] flex xl:justify-center">
          <SearchBar handleChange={handleChange} search={search} />
        </div>
        <div
          className="w-1/3 mr-4 flex justify-end py-2 px-2"
          style={{ marginTop: "20px" }}
        >
          <p className="text-xl font-semibold text-blue flex space-x-2">
            <select
              onChange={handleChange}
              name="type"
              className="px-3 py-1 w-full border-blue border-b-4 border-r-2 rounded-full shadow-md"
            >
              <option value="default">Search by type</option>
              <option value="Appartment">Appartment</option>
              <option value="House">House</option>
              <option value="Horizontal Property">Horizontal Property</option>
            </select>
            <select
              onChange={handleChange}
              name="price"
              className="px-3 py-1 w-full border-blue border-b-4 border-r-2 rounded-full shadow-md"
            >
              <option value="default">Search by price</option>
              <option value="-">Lowest to highest</option>
              <option value="+">Highest to lowest</option>
            </select>
          </p>
        </div>
      </div>

      {userProperties.length > 0 ? (
        <>
          <h1 className="absolute sm:text-5xl text-xl font-black text-violet mt-10 top-40 left-7 leading-[1.2] font-onest">
            LOOK AT
            <br /> YOUR PROPERTIES
          </h1>
          <p className="absolute text-lg font-bold text-white top-[320px] left-7 font-onest">
            MODIFY OR DELETE YOUR PROPERTIES.
          </p>

          <Paginado
            page={page}
            setPage={setPage}
            maxPage={maxPage}
            products={userProperties}
          />
          <div className="p-4">
            <Cards properties={userProperties} />
          </div>
          <Container className="flex justify-center bg-white rounded-full p-4 shadow-md">
            <Paginado
              page={page}
              setPage={setPage}
              maxPage={maxPage}
              products={userProperties}
            />
          </Container>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center mt-10">
          <h1 className="text-3xl text-center font-bold text-violet mb-10 font-onest">
            <FrownOutlined className="pt-20" />
            <br /> No properties found, please search again
          </h1>

          <div className="p-0 mt-10">
            <Footer />
          </div>
        </div>
      )}
      <div className="p-0">
        <Footer />
      </div>
    </div>
  );
}
