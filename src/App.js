import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import { loadToken, loadUser } from "./redux/reducers/userReducer";
import { getQuery } from "./utils/queryString";
import { useDispatch, useSelector } from "react-redux";

function App() {
	const { user, access_token } = useSelector((state) => state.user);
	const authenticated = user && access_token !== "";
	const dispatch = useDispatch();

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
		<Router>
			<Switch>
				<div className="App">
					<Route exact path="/">
						{authenticated ? <Home /> : <Login />}
					</Route>
					<Route path="/create-playlist">
						{authenticated ? <Home /> : <Redirect to="/" />}
					</Route>
				</div>
			</Switch>
		</Router>
	);
}

export default App;
