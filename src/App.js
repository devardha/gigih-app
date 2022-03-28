import { data } from "./data/gifs";
import "./App.css";
import Gif from "./components/Gif";

function App() {
	return (
		<div className="App">
			{data
				.filter((item) => item.rating === "g")
				.map((item) => (
					<Gif url={item.url} />
				))}
		</div>
	);
}

export default App;
