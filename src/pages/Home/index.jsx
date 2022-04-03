import React, { useState } from "react";
import Song from "../../components/Song";

const Home = ({ token, user }) => {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
	});

	const [songs, setSongs] = useState([]);
	const [tokenError, setTokenError] = useState(false);
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState([]);
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

	const addSongToPlaylist = async (playlistID) => {
		const filtered = songs.filter((item) => selected.includes(item.href));
		const uris =
			filtered.length > 0 ? filtered.map((item) => item.uri) : [];

		const body = {
			uris,
			position: 0,
		};

		fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization,
			},
			body: JSON.stringify(body),
		})
			.then((response) => response.json())
			.then((res) => {
				alert("Playlist created! Snapshot ID: " + res.snapshot_id);
			});
	};

	const createPlaylist = (e) => {
		e.preventDefault();

		const body = {
			name: formData.name,
			description: formData.description,
			public: false,
			collaborative: false,
		};

		fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization,
			},
			body: JSON.stringify(body),
		})
			.then((response) => response.json())
			.then((res) => {
				addSongToPlaylist(res.id);
			});
	};

	return (
		<div id="playlist">
			<form onSubmit={createPlaylist}>
				<h2>Create New Playlist</h2>
				<input
					type="text"
					placeholder="Title"
					value={formData.name}
					minLength={10}
					onChange={(e) =>
						setFormData({ ...formData, name: e.target.value })
					}
				/>
				<textarea
					type="text"
					placeholder="Title"
					value={formData.description}
					onChange={(e) =>
						setFormData({
							...formData,
							description: e.target.value,
						})
					}
				/>
				<button>Create</button>
			</form>
			<h2>Search Songs</h2>
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
			<div className="grid">
				{songs.map((item, index) => (
					<Song
						data={item}
						selected={selected}
						setSelected={setSelected}
						key={item.id + "" + index}
					/>
				))}
			</div>
		</div>
	);
};

export default Home;
