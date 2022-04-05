import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuery } from "../../redux/reducers/searchReducer";

const Search = ({ data, setData }) => {
	const query = useSelector((state) => state.search.q);
	const dispatch = useDispatch();

	const handleOnChange = (e) => {
		dispatch(updateQuery(e.target.value));
	};

	const handleSearch = async () => {
		const res = await fetch(
			`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${data.text}`
		)
			.then((res) => res.json())
			.catch((err) => console.log(err));

		setData({ ...data, gifs: res.data });
	};

	return (
		<div>
			<header>
				<input value={query} onChange={(e) => handleOnChange(e)} />
				<button onClick={() => handleSearch()}>Search</button>
			</header>
			<div className="grid">
				{data.gifs.map((item) => (
					<img
						src={item.images.fixed_width.url}
						key={item.id}
						alt="gif"
					/>
				))}
			</div>
		</div>
	);
};

export default Search;
