import React, { useEffect, useState } from "react";

const Trending = () => {
	const [data, setData] = useState({
		gifs: [],
	});

	useEffect(() => {
		(async () => {
			const res = await fetch(
				`https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}`
			)
				.then((res) => res.json())
				.catch((err) => console.log(err));

			setData({ ...data, gifs: res.data });
		})();
	}, []);

	return (
		<div>
			<header>
				<h2>Trending</h2>
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

export default Trending;
