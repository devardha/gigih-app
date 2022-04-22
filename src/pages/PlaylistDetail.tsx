import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Box,
	Button,
	Container,
	Flex,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useToast,
} from '@chakra-ui/react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import { PlaylistType, Song, UserState } from '../types/types';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import msToMinute from '../utils/duration';
import UpdatePlaylist from '../components/UpdatePlaylist';

interface PlaylistTrack {
	track: Song;
	added_at: string;
}

interface Params {
	id: string;
}

const PlaylistDetail = () => {
	const { accessToken } = useSelector((state: UserState) => state.user);
	const [playlist, setPlaylist] = useState<PlaylistType>();
	const [playlistItems, setPlaylistItems] = useState<PlaylistTrack[]>([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalEdit, setModalEdit] = useState(false);
	const [loading, setLoading] = useState(false);

	const params: Params = useParams();

	console.log(playlist);

	const getPlaylist = async (playlistID) => {
		if (accessToken && accessToken !== '') {
			fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			})
				.then((response) => response.json())
				.then((res) => {
					setPlaylist(res);
				});
		}
	};

	const getPlaylistTracks = async (playlistID) => {
		if (accessToken && accessToken !== '') {
			fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			})
				.then((response) => response.json())
				.then((res) => {
					setPlaylistItems(res.items);
				});
		}
	};

	const removeTrackFromPlaylist = async (
		playlistID: string,
		playlistURI: string
	) => {
		const body = { tracks: [{ uri: playlistURI }] };
		if (accessToken && accessToken !== '') {
			fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify(body),
			})
				.then((response) => response.json())
				.then((res) => {
					const filtered = playlistItems.filter(
						(item) => item.track.uri !== playlistURI
					);
					setPlaylistItems(filtered);
				});
		}
	};

	const toast = useToast();
	const history = useHistory();

	const deletePlaylist = (id, name) => {
		setLoading(true);
		fetch(`https://api.spotify.com/v1/playlists/${id}/followers`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then(() => {
				setLoading(false);
				toast({
					title: 'Playlist deleted!',
					description: `Playlist '${name}' has been deleted`,
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
				history.push('/playlist');
			})
			.catch((err) => {
				setLoading(false);
			});
	};

	useEffect(() => {
		if (params.id) {
			getPlaylist(params.id);
			getPlaylistTracks(params.id);
		}
	}, [params]);

	return (
		<>
			<Navbar />
			<Sidebar />
			{playlist && (
				<UpdatePlaylist
					modalOpen={modalEdit}
					setModalOpen={setModalEdit}
					data={playlist}
					setPlaylist={setPlaylist}
				/>
			)}
			<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Delete Playlist</ModalHeader>
					<ModalCloseButton
						_focus={{
							boxShadow: 'none',
						}}
					/>
					<ModalBody>
						<Text>
							Are you sure want to delet playlist &apos;
							{playlist?.name}&apos;?
						</Text>
					</ModalBody>

					<ModalFooter display="flex" justifyContent="center">
						<Button
							background="#1DB954"
							rounded="full"
							_hover={{ background: '#1CAF50' }}
							_active={{ background: '#1CAF50' }}
							mr={3}
							onClick={() => setModalOpen(false)}
							color="white"
						>
							Close
						</Button>
						<Button
							background="#EF266E"
							rounded="full"
							color="white"
							_hover={{ background: '#EF266E' }}
							_active={{ background: '#EF266E' }}
							isLoading={loading}
							onClick={() =>
								deletePlaylist(playlist?.id, playlist?.name)
							}
						>
							Delete
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			{playlist && (
				<Box paddingBottom={20}>
					<Container maxW="container.xl">
						<Box height={240}>
							<Flex
								height="full"
								alignItems="end"
								position="relative"
							>
								<Image
									height="full"
									src={playlist.images[0].url}
								/>
								<Box marginLeft={8}>
									<Text
										fontSize={64}
										fontWeight="bold"
										marginBottom={1}
									>
										{playlist.name}
									</Text>
									<Text marginBottom={1}>
										{playlist.description}
									</Text>
									<Text color="#777777" marginBottom={8}>
										by {playlist.owner.display_name}
									</Text>
									<Flex>
										<Button
											background="#1DB954"
											rounded="full"
											marginRight={4}
											_hover={{ background: '#1CAF50' }}
											_active={{ background: '#1CAF50' }}
											onClick={() => setModalEdit(true)}
										>
											Edit Playlist
										</Button>
										<Button
											background="#EF266E"
											rounded="full"
											_hover={{ background: '#EF266E' }}
											_active={{ background: '#EF266E' }}
											onClick={() => setModalOpen(true)}
										>
											Delete Playlist
										</Button>
									</Flex>
								</Box>
							</Flex>
						</Box>
						<TableContainer marginTop={16}>
							<Table>
								<Thead>
									<Tr>
										<Th
											borderColor="#222222"
											color="#777777"
											fontSize={16}
										>
											#
										</Th>
										<Th
											borderColor="#222222"
											color="#777777"
										>
											Title
										</Th>
										<Th
											borderColor="#222222"
											color="#777777"
										>
											Album
										</Th>
										<Th
											borderColor="#222222"
											color="#777777"
										>
											Date Added
										</Th>
										<Th
											borderColor="#222222"
											color="#777777"
										>
											Length
										</Th>
										<Th borderColor="#222222" />
									</Tr>
								</Thead>
								<Tbody>
									{playlistItems.map(
										(item: PlaylistTrack, index) => (
											<Tr key={item.track.id + index}>
												<Td
													borderColor="#222222"
													color="#777777"
												>
													{index + 1}
												</Td>
												<Td borderColor="#222222">
													<a
														href={
															item.track
																.external_urls
																.spotify
														}
													>
														<Flex>
															<Image
																src={
																	item.track
																		.album
																		.images[0]
																		.url
																}
																w={14}
															/>
															<Box marginLeft={4}>
																<Text
																	marginBottom={
																		2
																	}
																	fontWeight="bold"
																	fontSize={
																		18
																	}
																	textOverflow="ellipsis"
																	overflow="hidden"
																	whiteSpace="nowrap"
																	width="360px"
																>
																	{
																		item
																			.track
																			.name
																	}
																</Text>
																<Text color="#777777">
																	{item.track.artists.map(
																		(
																			artist
																		) =>
																			artist.name
																	)}
																</Text>
															</Box>
														</Flex>
													</a>
												</Td>
												<Td borderColor="#222222">
													<Text
														textOverflow="ellipsis"
														overflow="hidden"
														whiteSpace="nowrap"
														width="280px"
													>
														{item.track.album.name}
													</Text>
												</Td>
												<Td borderColor="#222222">
													{format(
														new Date(item.added_at),
														'MMM d, yyyy'
													)}
												</Td>
												<Td borderColor="#222222">
													{msToMinute(
														item.track.duration_ms
													)}
												</Td>
												<Td borderColor="#222222">
													<Text
														_hover={{
															color: 'white',
														}}
														color="#777777"
													>
														<FaTrash
															cursor="pointer"
															fontSize={16}
															onClick={() =>
																removeTrackFromPlaylist(
																	playlist.id,
																	item.track
																		.uri
																)
															}
														/>
													</Text>
												</Td>
											</Tr>
										)
									)}
								</Tbody>
							</Table>
						</TableContainer>
					</Container>
				</Box>
			)}
		</>
	);
};

export default PlaylistDetail;
