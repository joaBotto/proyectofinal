
const SearchBar = ({handleChange, search, handleSubmit, setSearch}) => {


	return (
		<div className="w-1/3 rounded-full relative top-4">
			<form onSubmit={handleSubmit}>
				<input
					className="font-onest text-blue px-3 py-1 w-full border-blue border-b-4 border-r-2 rounded-full shadow-md"
					type="text"
					placeholder="Search..."
					name="searchBar"
					value={search}
					onChange={handleChange}
				/>
				<button
					type="submit"
					className="bg-violet rounded-full py-1 px-2 text-white hover:bg-pink"
				>
					search
				</button>
				<button
					name="searchBar"
					type="button"
					onClick={handleChange}
					value = ""
					className="bg-blue rounded-full py-1 px-2 ml-2 text-white hover:bg-cyan"
				>
					x
				</button>
			</form>
		</div>
	);
};

export default SearchBar;
