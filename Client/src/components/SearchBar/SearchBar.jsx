import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchByQuery, setSearchQuery } from "../../redux/actions";

const SearchBar = () => {
	const dispatch = useDispatch();
	const [search, setSearch] = useState("");

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;

	const searchQuery = useSelector((state) => state.searchQuery);

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(searchByQuery(title));
		setCurrentPage(1);
	};

	const handleClearSearch = () => {
		dispatch(setSearchQuery(""));
		setSearch("");
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					className="w-full rounded-full"
					type="text"
					placeholder="Search"
					value={search}
					onChange={handleSearchChange}
				/>
			</form>
			{searchQuery && (
				<div>
					<p>
						{searchQuery} <span onClick={handleClearSearch}>Clear Search</span>
					</p>
				</div>
			)}
		</div>
	);
};

export default SearchBar;
