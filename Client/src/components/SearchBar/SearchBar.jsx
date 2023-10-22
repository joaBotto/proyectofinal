import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByQuery, clearSearch } from "../../redux/actions";

const SearchBar = () => {
	const dispatch = useDispatch();
	const [search, setSearch] = useState("");

	const [currentPage, setCurrentPage] = useState(1);

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(searchByQuery(search));
		setCurrentPage(1);
	};

	const handleClearSearch = () => {
		setSearch("");
		dispatch(clearSearch());
	};

	return (
		<div className="w-1/3 rounded-full relative top-4">
			<form onSubmit={handleSubmit}>
				<input
					className="font-onest text-blue px-3 py-1 w-full border-blue border-b-4 border-r-2 rounded-full shadow-md"
					type="text"
					placeholder="Search..."
					value={search}
					onChange={handleSearchChange}
				/>
				<button
					type="submit"
					className="bg-violet rounded-full py-1 px-2 text-white hover:bg-pink"
				>
					search
				</button>
				<button
					type="button"
					onClick={handleClearSearch}
					className="bg-blue rounded-full py-1 px-2 ml-2 text-white hover:bg-cyan"
				>
					x
				</button>
			</form>
		</div>
	);
};

export default SearchBar;
