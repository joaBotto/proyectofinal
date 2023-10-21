import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Container from "@mui/material/Container";
import Paginado from "../../components/Paginado/paginado";
import Cards from "../../components/Cards/Cards";
import SearchBar from "../../components/SearchBar/SearchBar";
import { FadeLoader } from "react-spinners";
import { getProperty, searchByQuery } from "../../redux/actions";
import { getProperty } from "../../redux/actions";
import { userAuthenticated } from "../../redux/actions";
import axios from "axios";

export default function Home() {
	const dispatch = useDispatch();
	const properties = useSelector((state) => state.properties);
	const user = useSelector((state) => state.user);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

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

		// Set an error if there are no active properties after 5 seconds
		const errorTimeout = setTimeout(() => {
			if (activeProperties.length === 0) {
				setError(true);
			}
		}, 5000);

		return () => {
			clearTimeout(errorTimeout); // Clear the timeout on unmount
		};
	}, [properties]);

	//Search By Query
	const searchQuery = useSelector((state) => state.searchQuery);
	useEffect(() => {
		if (searchQuery) {
			dispatch(searchByQuery(searchQuery));
		}
		setLoading(false);
	}, [searchQuery, dispatch, setLoading]);

	return (
		<div className="mt-5 mx-0">
			{loading ? (
				<div className="flex justify-center items-center h-screen">
					<FadeLoader color="#54086B" />
				</div>
			) : error ? (
				<div className="flex justify-center items-center h-screen">
					<h1 className="text-3xl font-bold text-violet">
						There are no active properties
					</h1>
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
					<SearchBar />
					<Paginado
						page={page}
						setPage={setPage}
						maxPage={maxPage}
						products={properties}
					/>
					<div className="p-4">
						<Cards properties={currentPageData} searchQuery={searchQuery} />
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
			)}
		</div>
	);
}
