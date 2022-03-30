import React, { useState } from "react";
import AlbumText from "../../components/AlbumText";
import Button from "../../components/Button";
import Image from "../../components/Image";

const Home = ({ token }) => {
	const [songs, setSongs] = useState([]);
	const [tokenError, setTokenError] = useState(false);
	const [query, setQuery] = useState("");
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
						setSongs(res.tracks.items);
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
			{songs.map((item) => (
				<div key={item.id} className="song">
					<Image url={item.album.images[0].url} alt="cover" />
					<div className="detail">
						<AlbumText label="Title" data={item.name} />
						<AlbumText label="Artists" data={item.artists} />
						<AlbumText label="Album" data={item.album.name} />
						<Button />
					</div>
				</div>
			))}
		</div>
	);
};

export default Home;
