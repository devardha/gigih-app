import React, { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home';
import Login from './pages/Login';
import { loadToken, loadUser } from './redux/reducers/userReducer';
import getQuery from './utils/queryString';
import { HashResult, State } from './types/types';

function App() {
	const { user, accessToken } = useSelector((state: State) => state.user);
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
		<ChakraProvider>
			<Router>
				<Switch>
					<div className="App">
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
					</div>
				</Switch>
			</Router>
		</ChakraProvider>
	);
}

export default App;