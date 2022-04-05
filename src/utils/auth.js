import crypto from "crypto";

export const handleAuth = () => {
	const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
	const redirect_uri =
		process.env.REACT_APP_BASE_URL || "http://localhost:3000";

	const state = crypto.randomBytes(8).toString("hex");

	localStorage.setItem("spotify-client", state);
	const scope = "playlist-modify-private user-read-private";

	let url = "https://accounts.spotify.com/authorize";
	url += "?response_type=token";
	url += "&client_id=" + encodeURIComponent(client_id);
	url += "&scope=" + encodeURIComponent(scope);
	url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
	url += "&state=" + encodeURIComponent(state);

	window.location = url;
};
