import React from "react";

const Search = ({ data, setData }) => {
	const handleOnChange = (e) => {
		setData({ ...data, text: e.target.value });
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
			<div>
				<input value={data.text} onChange={(e) => handleOnChange(e)} />
				<button onClick={() => handleSearch()}>Search</button>
			</div>
			<dov>
				{data.gifs.map((item) => (
					<img
						src={item.images.fixed_width.url}
						key={item.id}
						alt="gif"
					/>
				))}
			</dov>
		</div>
	);
};

export default Search;
