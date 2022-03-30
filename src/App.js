import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import crypto from "crypto";

function App() {
	const [accessToken, setAccessToken] = useState("");

	const handleAuth = () => {
		const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
		const redirect_uri = "http://localhost:3000";

		const state = crypto.randomBytes(8).toString("hex");

		localStorage.setItem("spotify-client", state);
		const scope = "playlist-modify-private";

		let url = "https://accounts.spotify.com/authorize";
		url += "?response_type=token";
		url += "&client_id=" + encodeURIComponent(client_id);
		url += "&scope=" + encodeURIComponent(scope);
		url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
		url += "&state=" + encodeURIComponent(state);

		window.location = url;
	};

	function getQuery(string) {
		const queries = string.substring(1).split("&");
		const finalObj = {};
		queries.forEach((query) => {
			const arr = query.split("=");
			if (arr.length > 1) finalObj[arr[0]] = arr[1];
		});
		return finalObj;
	}

	useEffect(() => {
		if (window.location.hash) {
			const hash = getQuery(window.location.hash);
			setAccessToken(hash.access_token);
		}
	}, []);

	return (
		<div className="App">
			<button className="auth" onClick={() => handleAuth()}>
				Log in
			</button>
			<Home token={accessToken} />
		</div>
	);
}

export default App;
