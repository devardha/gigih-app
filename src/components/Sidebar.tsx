import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPlusCircle, FaHome } from 'react-icons/fa';
import RenderLottie from '../Lottie';
import data from '../data/lottie/spotify-logo.json';

const Sidebar = () => {
	const location = useLocation();
	console.log('');
	return (
		<Box
			w="240px"
			background="blackAlpha.800"
			position="fixed"
			left={0}
			top={0}
			h="100vh"
		>
			<Flex
				paddingX={8}
				paddingY={5}
				justifyContent="start"
				alignItems="center"
				marginBottom={6}
			>
				<RenderLottie data={data} h={10} />
				<Text fontSize={20} fontWeight="bold" marginLeft={2}>
					Gigihtify
				</Text>
			</Flex>
			<Box paddingX={8}>
				<Link to="/create-playlist">
					<Text
						fontWeight="semibold"
						fontSize={18}
						marginBottom={3}
						display="flex"
						alignItems="center"
						color={
							location.pathname === '/create-playlist'
								? '#ffffff'
								: '#777777'
						}
					>
						<FaPlusCircle style={{ marginRight: 16 }} />
						Create
					</Text>
				</Link>
				<Link to="/playlist">
					<Text
						fontWeight="semibold"
						fontSize={18}
						marginBottom={3}
						display="flex"
						alignItems="center"
						color={
							location.pathname === '/playlist'
								? '#ffffff'
								: '#777777'
						}
					>
						<FaHome style={{ marginRight: 16 }} />
						Playlist
					</Text>
				</Link>
			</Box>
		</Box>
	);
};

export default Sidebar;
