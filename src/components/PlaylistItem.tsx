import {
	Box,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PlaylistType, UserState } from '../types/types';
import AlbumText from './AlbumText';
import Image from './Image';

interface Props {
	data: PlaylistType;
}

function PlaylistItem({ data }: Props) {
	const { accessToken } = useSelector((state: UserState) => state.user);
	const [modalOpen, setModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	return (
		<Link to={`/playlist/${data.id}`}>
			<Box key={data.id} position="relative">
				<Image url={data.images[0].url} alt="cover" />
				<Box marginTop={2}>
					<AlbumText label="Title" data={data.name} />
					<AlbumText
						label="Owner"
						data={`by ${data.owner.display_name}`}
					/>
				</Box>
			</Box>
		</Link>
	);
}

export default PlaylistItem;
