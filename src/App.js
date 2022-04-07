import React from "react";
import Search from "./pages/Search";
import Trending from "./pages/Trending";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
	return (
		<Provider store={store}>
			<Router>
				<nav>
					<Link to="/">Search</Link>
					<Link to="/trending">Trending</Link>
				</nav>
				<Routes>
					<Route path="/" element={<Search />}></Route>
					<Route path="/trending" element={<Trending />}></Route>
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
