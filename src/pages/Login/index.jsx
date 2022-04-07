import React from "react";
import { handleAuth } from "../../utils/auth";

const Login = () => {
	return (
		<div className="login">
			<button onClick={() => handleAuth()}>Login with Spotify</button>
		</div>
	);
};

export default Login;
