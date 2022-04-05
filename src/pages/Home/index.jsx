import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Song from "../../components/Song";
import { loadToken, loadUser } from "../../redux/reducers/userReducer";
import { handleAuth } from "../../utils/auth";
import { getQuery } from "../../utils/queryString";

const Home = () => {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
	});

	const [songs, setSongs] = useState([]);
	const [tokenError, setTokenError] = useState(false);
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState([]);
	const { user, access_token } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const Authorization = `Bearer ${access_token}`;

	const handleSearch = async () => {
		if (access_token && access_token !== "") {
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

	const getCurrentUser = () => {
		const Authorization = `Bearer ${access_token}`;
		fetch(`https://api.spotify.com/v1/me`, {
			headers: {
				"Content-Type": "application/json",
				Authorization,
			},
		})
			.then((response) => response.json())
			.then((res) => {
				if (res.id) {
					dispatch(loadUser(res));
				}
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

	useEffect(() => {
		if (access_token) {
			getCurrentUser();
		}
	}, [access_token]);

	useEffect(() => {
		if (window.location.hash) {
			const hash = getQuery(window.location.hash);
			dispatch(loadToken(hash.access_token));
		}
	}, []);

	return (
		<>
			<header>
				<h2>Gigih App</h2>
				{user.id ? (
					<p>Hello, {user.display_name}</p>
				) : (
					<button className="auth" onClick={() => handleAuth()}>
						Log in
					</button>
				)}
			</header>
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
		</>
	);
};

export default Home;
