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

const Home = () => {
	const [formData, setFormData] = useState({
		name: '',
		description: '',
	});
	const toast = useToast();

	const [modalOpen, setModalOpen] = useState(true);

	const [songss, setSongs] = useState<Song[]>([]);
	const [tokenError, setTokenError] = useState(false);
	const [query, setQuery] = useState<string>('');
	const [selected, setSelected] = useState<string[]>([]);
	const { user, accessToken } = useSelector((state: UserState) => state.user);
	const { results } = useSelector((state: SearchState) => state.search);

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
			<Box position="fixed" w="full">
				<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Create Playlist</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Input placeholder="Title" marginBottom={3} />
							<Textarea placeholder="Description (min 10)" />
						</ModalBody>

						<ModalFooter>
							<Button background="green.500" color="white">
								Save
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Box>
			<Box>
				<Box
					paddingX={10}
					paddingY={5}
					position="fixed"
					bottom={0}
					zIndex={100}
					w="100%"
				>
					<Box
						opacity="100%"
						background="green.500"
						height="100%"
						w="100%"
						position="absolute"
						left={0}
						top={0}
					/>
					<Flex
						justifyContent="space-between"
						alignItems="center"
						position="relative"
						zIndex={100}
					>
						<Text fontWeight={600}>8 Songs selected</Text>
						<Button
							background="blackAlpha.900"
							rounded="full"
							paddingX={8}
							onClick={() => setModalOpen(true)}
						>
							Create
						</Button>
					</Flex>
				</Box>
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
