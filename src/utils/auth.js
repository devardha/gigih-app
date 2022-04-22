const handleAuth = () => {
	const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID || '';
	const redirectUri =
		process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

	const scope =
		'playlist-modify-private playlist-modify-public user-read-private playlist-read-private';

	let url = 'https://accounts.spotify.com/authorize';
	url += '?response_type=token';
	url += `&client_id=${encodeURIComponent(clientId)}`;
	url += `&scope=${encodeURIComponent(scope)}`;
	url += `&redirect_uri=${encodeURIComponent(redirectUri)}`;

	window.location = url;
};

export default handleAuth;
