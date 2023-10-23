const SearchBar = ({ handleChange, search }) => {
	return (
		<div className="w-1/3 rounded-full relative top-4">
			<form className="flex flex-row">
				<input
					className="font-onest text-blue px-3 py-2 w-full border-blue border-b-4 border-r-2 rounded-full shadow-md"
					type="text"
					placeholder="Search..."
					name="searchBar"
					value={search}
					onChange={handleChange}
				/>
				<button
					name="searchBar"
					type="button"
					onClick={handleChange}
					value=""
					className="font-onest text-blue bg-cyan hover:bg-opacity-50 border-blue border-2 px-3 py-1 rounded-full text-sm absolute right-2 bottom-2"
				>
					x
				</button>
			</form>
		</div>
	);
};

export default SearchBar;
