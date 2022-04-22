import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Box,
	Container,
	Flex,
	Image,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import { PlaylistType, Song, UserState } from '../types/types';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import msToMinute from '../utils/duration';

interface PlaylistTrack {
	track: Song;
	added_at: string;
}

const PlaylistDetail = () => {
	const { accessToken } = useSelector((state: UserState) => state.user);
	const [playlist, setPlaylist] = useState<PlaylistType>();
	const [playlistItems, setPlaylistItems] = useState<PlaylistTrack[]>([]);
	const params: any = useParams();

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
				<Box paddingBottom={20}>
					<Container maxW="container.xl">
						<Box height={240}>
							<Flex height="full" alignItems="end">
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
									<Text marginBottom={4}>
										{playlist.description}
									</Text>
									<Text color="#777777">
										by {playlist.owner.display_name}
									</Text>
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
													<Flex>
														<Image
															src={
																item.track.album
																	.images[0]
																	.url
															}
															w={14}
														/>
														<Box marginLeft={4}>
															<Text
																marginBottom={2}
																fontWeight="bold"
																fontSize={18}
															>
																{
																	item.track
																		.name
																}
															</Text>
															<Text color="#777777">
																{item.track.artists.map(
																	(
																		artist: any
																	) =>
																		artist.name
																)}
															</Text>
														</Box>
													</Flex>
												</Td>
												<Td borderColor="#222222">
													{item.track.album.name}
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
