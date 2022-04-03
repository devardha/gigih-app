import "./App.css";
import React, { useState } from "react";
import Search from "./pages/Search";

function App() {
	const [data, setData] = useState({
		text: "",
		gifs: [],
	});

	return (
		<div className="App">
			<Search data={data} setData={setData} />
		</div>
	);
}

export default App;
