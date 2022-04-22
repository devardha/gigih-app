import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Box,
	Container,
	GridItem,
	Heading,
	Text,
	Grid,
} from '@chakra-ui/react';
import { PlaylistType, SearchState, Song, UserState } from '../types/types';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import SongItem from '../components/Song';
import PlaylistItem from '../components/PlaylistItem';

const Playlist = () => {
	const { results } = useSelector((state: SearchState) => state.search);
	const { accessToken } = useSelector((state: UserState) => state.user);
	const [playlist, setPlaylist] = useState<PlaylistType[]>([]);

	const handleSearch = async () => {
		if (accessToken && accessToken !== '') {
			fetch('https://api.spotify.com/v1/me/playlists', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			})
				.then((response) => response.json())
				.then((res) => {
					if (res.items) {
						setPlaylist(res.items);
					}
				});
		}
	};

	const removePlaylist = (id: string) => {
		const filtered = playlist.filter((item) => item.id !== id);
		setPlaylist(filtered);
	};

	useEffect(() => {
		handleSearch();
	}, []);

	return (
		<>
			<Navbar />
			<Sidebar />
			<Box>
				<Container maxW="container.xl" paddingY={4}>
					<Box>
						{results.length > 0 && (
							<Box marginBottom={8}>
								<Heading
									as="h2"
									fontSize="3xl"
									marginBottom={2}
								>
									My Playlist
								</Heading>
								<Text>Showing {playlist.length} playlist</Text>
							</Box>
						)}
					</Box>
					{playlist.length > 0 && (
						<Grid
							templateColumns="repeat(5, 1fr)"
							gap={6}
							rowGap={6}
							paddingBottom={20}
						>
							{playlist.map(
								(item: PlaylistType, index: number) => (
									<GridItem
										key={`${item.id}${index}`}
										width="100%"
									>
										<PlaylistItem
											data={item}
											removePlaylist={removePlaylist}
										/>
									</GridItem>
								)
							)}
						</Grid>
					)}
				</Container>
			</Box>
		</>
	);
};

export default Playlist;
