import React, { useState } from "react";
import Search from "./pages/Search";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
	const [data, setData] = useState({
		gifs: [],
	});

	return (
		<Provider store={store}>
			<div className="App">
				<Search data={data} setData={setData} />
			</div>
		</Provider>
	);
}

export default App;
