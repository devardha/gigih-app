import {
	Box,
	Button,
	Container,
	Flex,
	Image,
	Input,
	Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSongs } from '../redux/reducers/searchReducer';
import { UserState, Song, SearchState } from '../types/types';

const Navbar = () => {
	const [query, setQuery] = useState<string>('');
	const { user, accessToken } = useSelector((state: UserState) => state.user);
	const { results } = useSelector((state: SearchState) => state.search);

	const dispatch = useDispatch();

	const handleSearch = async () => {
		if (accessToken && accessToken !== '') {
			fetch(
				`https://api.spotify.com/v1/search?q=${encodeURIComponent(
					query
				)}&type=track`,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)
				.then((response) => response.json())
				.then((res) => {
					if (res.tracks) {
						dispatch(loadSongs([...results, ...res.tracks.items]));
					}
				});
		}
	};

	return (
		<Box marginBottom={5}>
			<Container maxW="container.xl" paddingY={5}>
				<Flex justifyContent="space-between" color="white">
					<Flex flex={1}>
						<Input
							placeholder="Search"
							maxW="xl"
							shadow="sm"
							border="none"
							background="whiteAlpha.50"
							_placeholder={{ color: '#555' }}
							rounded="full"
							type="text"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							role="search"
							name="search"
							id="search"
						/>
						<Button
							background="green.500"
							rounded="full"
							marginLeft={2}
							onClick={() => handleSearch()}
							_hover={{ background: 'green.500' }}
							_active={{ background: 'green.600' }}
						>
							Search
						</Button>
					</Flex>
					{user.id ? (
						<Flex>
							<Text>{user.display_name}</Text>
							{user.images.length > 0 && (
								<Image
									w={7}
									h={7}
									marginLeft={3}
									rounded="full"
									src={user.images[0].url}
								/>
							)}
						</Flex>
					) : (
						''
					)}
				</Flex>
			</Container>
		</Box>
	);
};

export default Navbar;
