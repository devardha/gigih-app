import React, { useEffect } from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home';
import Login from './pages/Login';
import { loadToken, loadUser } from './redux/reducers/userReducer';
import getQuery from './utils/queryString';

function App() {
	const { user, accessToken } = useSelector((state) => state.user);
	const authenticated = user && accessToken !== '';
	const dispatch = useDispatch();

	useEffect(() => {
		if (accessToken) {
			(() => {
				fetch('https://api.spotify.com/v1/me', {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				})
					.then((response) => response.json())
					.then((res) => {
						if (res.id) {
							dispatch(loadUser(res));
						}
					});
			})();
		}
	}, [accessToken, dispatch]);

	useEffect(() => {
		if (window.location.hash) {
			const hash = getQuery(window.location.hash);

			if (hash.access_token) {
				dispatch(loadToken(hash.access_token));
			}
		}
	}, [dispatch]);

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
