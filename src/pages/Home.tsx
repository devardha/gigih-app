import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Input,
	Textarea,
	Box,
	Flex,
	Container,
	Heading,
	Button,
	Grid,
	GridItem,
	FormControl,
	useToast,
} from '@chakra-ui/react';
import SongItem from '../components/Song';
import { State, Song } from '../types/types';

const Home = () => {
	const [formData, setFormData] = useState({
		name: '',
		description: '',
	});
	const toast = useToast();

	const [songs, setSongs] = useState<Song[]>([]);
	const [tokenError, setTokenError] = useState(false);
	const [query, setQuery] = useState<string>('');
	const [selected, setSelected] = useState<string[]>([]);
	const { user, accessToken } = useSelector((state: State) => state.user);

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
						setTokenError(false);
						setSongs([...songs, ...res.tracks.items]);
					}

					if (res.error && res.error.status === 401) {
						setTokenError(true);
					}
				});
		} else {
			setTokenError(true);
		}
	};

	const addSongToPlaylist = async (playlistID: string) => {
		const filtered: Song[] = songs.filter((item: Song) =>
			selected.includes(item.href)
		);

		const uris =
			filtered.length > 0 ? filtered.map((item) => item.uri) : [];

		const body = {
			uris,
			position: 0,
		};

		fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(body),
		})
			.then((response) => response.json())
			.then(() => {
				toast({
					title: 'Playlist created!',
					description:
						'Playlist has been created. Open Spotify to see the playlist.',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			});
	};

	const createPlaylist = () => {
		const body = {
			name: formData.name,
			description: formData.description,
			public: false,
			collaborative: false,
		};

		fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(body),
		})
			.then((response) => response.json())
			.then((res) => {
				addSongToPlaylist(res.id);
			});
	};

	return (
		<>
			<Box background="gray.100" marginBottom={5}>
				<Container maxW="container.xl" paddingY={5}>
					<Flex justifyContent="space-between">
						<Heading as="h1" fontSize="20">
							Gigih App
						</Heading>
						{user.id ? <p>Hello, {user.display_name} 👋</p> : ''}
					</Flex>
				</Container>
			</Box>
			<Box>
				<Container maxW="container.xl" paddingY={4}>
					<Box marginBottom={16}>
						<FormControl>
							<Heading as="h2" fontSize="2xl" marginBottom={4}>
								🎶 Create New Playlist
							</Heading>
							<Input
								type="text"
								placeholder="Title"
								value={formData.name}
								minLength={10}
								onChange={(e) =>
									setFormData({
										...formData,
										name: e.target.value,
									})
								}
								marginBottom={4}
							/>
							<Textarea
								placeholder="Title"
								value={formData.description}
								onChange={(e) =>
									setFormData({
										...formData,
										description: e.target.value,
									})
								}
							/>
							<Button
								type="button"
								background="green.300"
								color="white"
								marginTop={4}
								onClick={() => createPlaylist()}
							>
								Create
							</Button>
						</FormControl>
					</Box>
					<Box>
						<Heading as="h2" fontSize="2xl" marginBottom={4}>
							🎵 Search Songs
						</Heading>
						<Flex marginBottom={5}>
							<Input
								type="text"
								placeholder="Search"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
							/>
							<Button
								type="button"
								onClick={() => handleSearch()}
								marginLeft={4}
							>
								Search
							</Button>
						</Flex>
						{tokenError && (
							<p>Invalid access token. Please log in</p>
						)}
						<Grid templateColumns="repeat(6, 1fr)" gap={6}>
							{songs.map((item: Song, index: number) => (
								<GridItem
									key={`${item.id}${index}`}
									width="100%"
								>
									<SongItem
										data={item}
										selected={selected}
										setSelected={setSelected}
									/>
								</GridItem>
							))}
						</Grid>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default Home;
