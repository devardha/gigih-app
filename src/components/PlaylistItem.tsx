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
import { PlaylistType, UserState } from '../types/types';
import AlbumText from './AlbumText';
import Image from './Image';

interface Props {
	data: PlaylistType;
	removePlaylist(arg1: string): void;
}

function PlaylistItem({ data, removePlaylist }: Props) {
	const { accessToken } = useSelector((state: UserState) => state.user);
	const [modalOpen, setModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const toast = useToast();

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
				removePlaylist(id);
				setLoading(false);
				toast({
					title: 'Playlist deleted!',
					description: `Playlist '${name}' has been deleted`,
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			})
			.catch((err) => {
				setLoading(false);
			});
	};

	return (
		<Box key={data.id} position="relative">
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
							{data.name}&apos;?
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
							onClick={() => deletePlaylist(data.id, data.name)}
						>
							Delete
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Box
				position="absolute"
				right={3}
				top={3}
				background="blackAlpha.400"
				rounded="full"
				padding={1}
				onClick={() => setModalOpen(true)}
				cursor="pointer"
			>
				<RiCloseLine fontSize={24} />
			</Box>

			<Image url={data.images[0].url} alt="cover" />
			<Box marginTop={2}>
				<AlbumText label="Title" data={data.name} />
				<AlbumText
					label="Owner"
					data={`by ${data.owner.display_name}`}
				/>
			</Box>
		</Box>
	);
}

export default PlaylistItem;
