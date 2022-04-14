import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuery } from "../../redux/reducers/searchReducer";
import { Box, Button, Container, Flex, Input } from "@chakra-ui/react";

const Search = () => {
	const [data, setData] = useState({
		gifs: [],
	});

	const query = useSelector((state) => state.search.q);
	const dispatch = useDispatch();

	const handleOnChange = (e) => {
		dispatch(updateQuery(e.target.value));
	};

	const handleSearch = async () => {
		const res = await fetch(
			`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${data.text}`
		)
			.then((res) => res.json())
			.catch((err) => console.log(err));

		setData({ ...data, gifs: res.data });
	};

	return (
		<div>
			<Box>
				<Container maxW="container.xl" marginTop={8}>
					<Flex>
						<Input
							value={query}
							onChange={(e) => handleOnChange(e)}
						/>
						<Button onClick={() => handleSearch()} marginLeft={2}>
							Search
						</Button>
					</Flex>
				</Container>
			</Box>
			<div className="grid">
				{data.gifs.map((item) => (
					<img
						src={item.images.fixed_width.url}
						key={item.id}
						alt="gif"
					/>
				))}
			</div>
		</div>
	);
};

export default Search;
