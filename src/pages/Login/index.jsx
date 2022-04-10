import React from 'react';
import handleAuth from '../../utils/auth';

function Login() {
	return (
		<div className="login">
			<button type="button" onClick={() => handleAuth()}>
				Login with Spotify
			</button>
		</div>
	);
}

export default Login;
