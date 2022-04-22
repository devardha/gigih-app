import React, { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';
import Home from './pages/Home';
import Login from './pages/Login';
import { loadToken, loadUser } from './redux/reducers/userReducer';
import getQuery from './utils/queryString';
import { HashResult, UserState } from './types/types';
import Playlist from './pages/Playlist';

function App() {
	const { user, accessToken } = useSelector((state: UserState) => state.user);
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
		const locationHash: string = window.location.hash;
		if (locationHash) {
			const hash: HashResult = getQuery(locationHash);

			if (hash.access_token) {
				dispatch(loadToken(hash.access_token));
			}
		}
	}, [dispatch]);

	return (
		<Router>
			<Switch>
				<Box
					className="App"
					background="blackAlpha.900"
					color="white"
					minH="100vh"
				>
					<Route exact path="/">
						{authenticated ? (
							<Redirect to="/create-playlist" />
						) : (
							<Login />
						)}
					</Route>
					<Route path="/create-playlist">
						{authenticated ? <Home /> : <Redirect to="/" />}
					</Route>
					<Route path="/playlist">
						{authenticated ? <Playlist /> : <Redirect to="/" />}
					</Route>
				</Box>
			</Switch>
		</Router>
	);
}

export default App;
