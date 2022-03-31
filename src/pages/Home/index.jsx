import React, { useState } from "react";
import Song from "../../components/Song";

const Home = ({ token }) => {
	const [songs, setSongs] = useState([]);
	const [tokenError, setTokenError] = useState(false);
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState("");
	const Authorization = `Bearer ${token}`;

	const handleSearch = async () => {
		if (token && token !== "") {
			fetch(
				`https://api.spotify.com/v1/search?q=${encodeURIComponent(
					query
				)}&type=track`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization,
					},
				}
			)
				.then((response) => response.json())
				.then((res) => {
					if (res.tracks) {
						setTokenError(false);
						setSongs([...songs, ...res.tracks.items]);
					}

					if (res.error && res.error.status === 401) {
						setTokenError(true);
					}
				});
		} else {
			setTokenError(true);
		}
	};

	return (
		<div id="playlist">
			<div className="searchbox">
				<input
					type="text"
					placeholder="Search"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button onClick={() => handleSearch()}>Search</button>
			</div>
			{tokenError && <p>Invalid access token. Please log in</p>}
			{songs.map((item, index) => (
				<div
					key={item.id + "" + index}
					onClick={() =>
						item.href === selected
							? setSelected("")
							: setSelected(item.href)
					}
				>
					<Song data={item} selected={selected} />
				</div>
			))}
		</div>
	);
};

export default Home;
