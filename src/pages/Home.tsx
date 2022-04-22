import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
	Text,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
} from '@chakra-ui/react';
import SongItem from '../components/Song';
import { SearchState, Song, SongState, UserState } from '../types/types';
import Navbar from '../components/Navbar';
import { addSong } from '../redux/reducers/songReducer';
import CreateNewPlaylist from '../components/CreateNewPlaylist';
import BottomNav from '../components/BottomNav';

const Home = () => {
	const [formData, setFormData] = useState({
		name: '',
		description: '',
	});
	const toast = useToast();

	const [modalOpen, setModalOpen] = useState(false);
	const dispatch = useDispatch();
	const { user, accessToken } = useSelector((state: UserState) => state.user);
	const { results } = useSelector((state: SearchState) => state.search);
	const { selectedSongs } = useSelector((state: SongState) => state.song);

	// const addSongToPlaylist = async (playlistID: string) => {
	// 	const filtered: Song[] = songs.filter((item: Song) =>
	// 		selected.includes(item.href)
	// 	);

	// 	const uris =
	// 		filtered.length > 0 ? filtered.map((item) => item.uri) : [];

	// 	const body = {
	// 		uris,
	// 		position: 0,
	// 	};

	// 	fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			Authorization: `Bearer ${accessToken}`,
	// 		},
	// 		body: JSON.stringify(body),
	// 	})
	// 		.then((response) => response.json())
	// 		.then(() => {
	// 			toast({
	// 				title: 'Playlist created!',
	// 				description:
	// 					'Playlist has been created. Open Spotify to see the playlist.',
	// 				status: 'success',
	// 				duration: 9000,
	// 				isClosable: true,
	// 			});
	// 		});
	// };

	// const createPlaylist = () => {
	// 	const body = {
	// 		name: formData.name,
	// 		description: formData.description,
	// 		public: false,
	// 		collaborative: false,
	// 	};

	// 	fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			Authorization: `Bearer ${accessToken}`,
	// 		},
	// 		body: JSON.stringify(body),
	// 	})
	// 		.then((response) => response.json())
	// 		.then((res) => {
	// 			addSongToPlaylist(res.id);
	// 		});
	// };

	return (
		<>
			<Navbar />
			<CreateNewPlaylist
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
			/>
			<Box>
				{selectedSongs.length > 0 && (
					<BottomNav
						selectedSongs={selectedSongs}
						setModalOpen={setModalOpen}
					/>
				)}
				<Container maxW="container.xl" paddingY={4}>
					{/* <Box marginBottom={16}>
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
								background="green.500"
								color="white"
								marginTop={4}
								onClick={() => createPlaylist()}
							>
								Create
							</Button>
						</FormControl>
					</Box> */}
					<Box>
						<Box marginBottom={8}>
							<Heading as="h2" fontSize="3xl" marginBottom={2}>
								Results
							</Heading>
							<Text>Showing {results.length} results</Text>
						</Box>
						<Grid
							templateColumns="repeat(5, 1fr)"
							gap={6}
							rowGap={20}
						>
							{results.map((item: Song, index: number) => (
								<GridItem
									key={`${item.id}${index}`}
									width="100%"
								>
									<SongItem data={item} />
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
