import React from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

const BottomNav = ({ selectedSongs, setModalOpen }) => (
	<Box
		paddingX={10}
		paddingY={5}
		position="fixed"
		bottom={0}
		zIndex={100}
		w="100%"
		shadow="2xl"
		left={0}
	>
		<Box
			opacity="100%"
			background="#1DB954"
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
			<Text fontWeight={600}>{selectedSongs.length} Songs selected</Text>
			<Button
				background="blackAlpha.900"
				rounded="full"
				paddingX={8}
				onClick={() => setModalOpen(true)}
				_hover={{ background: 'blackAlpha.900' }}
				_active={{ background: 'black' }}
			>
				Create
			</Button>
		</Flex>
	</Box>
);

export default BottomNav;
