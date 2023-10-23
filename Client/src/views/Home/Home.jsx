import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Container from "@mui/material/Container";
import Paginado from "../../components/Paginado/paginado";
import Cards from "../../components/Cards/Cards";
import SearchBar from "../../components/SearchBar/SearchBar";
import { FadeLoader } from "react-spinners";
import { getProperty, searchByQuery, filters } from "../../redux/actions";
import { userAuthenticated } from "../../redux/actions";
import axios from "axios";

export default function Home() {
	const dispatch = useDispatch();
	const properties = useSelector((state) => state.properties);
	const user = useSelector((state) => state.user);
	const [loading, setLoading] = useState(true);
	const [noResults, setNoResults] = useState(false);


// ----------------FILTROS---------------------------
	const [type, setType] = useState("default");
	const [orderPrice, setOrderPrice] = useState("default");
	const [search, setSearch] = useState("");
	

	const handleChange = (event) => {
		const name = event.target.name;

		if(name === "searchBar"){
			setSearch(event.target.value)
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



	// -----------------------------------------------------

	useEffect(() => {
			dispatch(getProperty());
	}, [dispatch]);

	useEffect(() => {
		axios
			.get("http://localhost:3001/auth/user", { withCredentials: true })
			.then((response) => {
				const user = response.data.user;
				if (user) {
					dispatch(userAuthenticated(user));
				}
			})
			.catch((error) => {
				window.alert(error.message);
			});
	}, []);

	console.log("soy el user en home", user);
	console.log("Soy prop en el home", properties);
	const activeProperties = properties.filter(
		(properties) => properties.active === true
	);
	const [page, setPage] = useState(1);
	const perPage = 8;
	const maxPage = Math.ceil(activeProperties.length / perPage);
	const currentPageData = activeProperties.slice(
		(page - 1) * perPage,
		page * perPage
	);

	useEffect(() => {
		setPage(1);
		setLoading(false);

		const errorTimeout = setTimeout(() => {
			if (activeProperties.length === 0) {
				setNoResults(true);
				setLoading(false);
			}
		}, 3000);

		return () => {
			clearTimeout(errorTimeout);
		};
	}, [properties]);

	return (
		<div className="mt-5 mx-0">
			<div className="w-full absolute top-[400px] flex xl:justify-center md:ml-3">
				<SearchBar handleChange={handleChange} search={search} setSearch={setSearch} handleSubmit={handleSubmit} />
			</div>
			
				<div className="bg-transparent flex flex-row justify-end py-2 w-full rounded-full">
					<div className="w-1/3 mr-4 flex justify-end py-2 px-2"style={{ marginTop: '20px' }}>
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


			{loading ? (
				<div className="flex justify-center items-center h-screen">
					<FadeLoader color="#54086B" />
				</div>
			) : noResults ? (
				<div className="flex justify-center items-center h-screen">
					<h1 className="text-3xl font-bold text-violet">
						There are no active properties
					</h1>
					<button
						onClick={() => {
							setNoResults(false);
							dispatch(getProperty());
						}}
						className="text-cyan hover:underline"
					>
						Show all properties
					</button>
				</div>
			) : (
				<div className="mt-5 mx-0">
					<h1 className="absolute sm:text-5xl text-xl font-black text-violet mt-10 top-40 left-7 leading-[1.2] font-onest">
						FIND A HOME THAT
						<br /> SUITS YOU
					</h1>
					<p className="absolute text-lg font-bold text-white top-[320px] left-7 font-onest">
						+200 PROPERTIES
					</p>
					<p className="absolute text-lg font-bold text-white mt-6 top-[320px] left-7 font-onest">
						+400 HAPPY CUSTOMERS
					</p>
					<div className="">
						<Paginado
							page={page}
							setPage={setPage}
							maxPage={maxPage}
							products={properties}
						/>
					</div>
					<div className="p-4">
						<Cards properties={currentPageData} searchQuery={searchQuery} />
					</div>
					<Container className="flex flex-row mb-3 justify-center">
						<Paginado
							page={page}
							setPage={setPage}
							maxPage={maxPage}
							products={properties}
						/>
						<p className="my-4 font-noto text-blue flex justify-center text-sm space-x-1">
							<p> Showing </p>{" "}
							<p className="font-black"> {currentPageData.length} </p>{" "}
							<p> out of </p>
							<p className="font-black">{activeProperties.length}</p>
							<p>total properties</p>
						</p>
					</Container>
					<div className="p-0">
						<Footer />
					</div>
				</div>
			)}
		</div>
	);
}
