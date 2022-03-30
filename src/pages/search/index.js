import React from "react";

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			gifs: [],
		};
	}

	handleOnChange(e) {
		this.setState({ text: e.target.value });
	}

	async handleSearch() {
		const res = await fetch(
			`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${this.state.text}`
		)
			.then((res) => res.json())
			.catch((err) => console.log(err));

		this.setState({ gifs: res.data });
		console.log(res);
	}

	render() {
		return (
			<div>
				<div>
					<input
						value={this.state.text}
						onChange={(e) => this.handleOnChange(e)}
					/>
					<button onClick={() => this.handleSearch()}>Search</button>
				</div>
				<dov>
					{this.state.gifs.map((item) => (
						<img
							src={item.images.fixed_width.url}
							key={item.id}
							alt="gif"
						/>
					))}
				</dov>
			</div>
		);
	}
}

export default Search;
