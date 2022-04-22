import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Box,
	Flex,
	Container,
	Heading,
	Grid,
	GridItem,
	Text,
} from '@chakra-ui/react';
import { FaSpotify } from 'react-icons/fa';
import SongItem from '../components/Song';
import { SearchState, Song, SongState } from '../types/types';
import Navbar from '../components/Navbar';
import CreateNewPlaylist from '../components/CreateNewPlaylist';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Sidebar';

const Home = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const { results } = useSelector((state: SearchState) => state.search);
	const { selectedSongs } = useSelector((state: SongState) => state.song);

	return (
		<>
			<Navbar />
			<Sidebar />
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
					<Box>
						{results.length > 0 && (
							<Box marginBottom={8}>
								<Heading
									as="h2"
									fontSize="3xl"
									marginBottom={2}
								>
									Results
								</Heading>
								<Text>Showing {results.length} results</Text>
							</Box>
						)}
						{results.length > 0 && (
							<Grid
								templateColumns="repeat(5, 1fr)"
								gap={6}
								rowGap={20}
								paddingBottom={20}
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
						)}
						{results.length === 0 && (
							<Flex
								justifyContent="center"
								alignItems="center"
								flexDirection="column"
								height="70vh"
							>
								<FaSpotify fontSize={300} color="#1A1A1A" />
								<Text
									color="#777777"
									fontSize={20}
									marginTop={10}
								>
									Search songs to start creating playlist
								</Text>
							</Flex>
						)}
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default Home;
