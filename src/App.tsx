import React from "react";
import Search from "./pages/SearchBox";
import Trending from "./pages/Trending";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box, ChakraProvider, Container, Flex } from "@chakra-ui/react";

function App() {
	return (
		<ChakraProvider>
			<Provider store={store}>
				<Router>
					<Box>
						<Container maxW="container.xl">
							<Flex justifyContent="center" paddingY={10}>
								<Link
									to="/"
									style={{ marginLeft: 16, marginRight: 16 }}
								>
									Search
								</Link>
								<Link
									to="/trending"
									style={{ marginLeft: 16, marginRight: 16 }}
								>
									Trending
								</Link>
							</Flex>
						</Container>
					</Box>
					<Routes>
						<Route path="/" element={<Search />}></Route>
						<Route path="/trending" element={<Trending />}></Route>
					</Routes>
				</Router>
			</Provider>
		</ChakraProvider>
	);
}

export default App;
