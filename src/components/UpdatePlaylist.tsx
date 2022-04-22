import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Playlist from '../pages/Playlist';
import { PlaylistType, UserState } from '../types/types';

interface Props {
	modalOpen: boolean;
	setModalOpen(arg1: boolean): void;
	data: PlaylistType;
	setPlaylist(arg1: PlaylistType): void;
}

const UpdatePlaylist = ({
	modalOpen,
	setModalOpen,
	data,
	setPlaylist,
}: Props) => {
	const { accessToken } = useSelector((state: UserState) => state.user);

	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: data.name,
		description: data.description,
	});

	const toast = useToast();

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
					setModalOpen(false);
					setLoading(false);
					setPlaylist(res);
					toast({
						title: 'Playlist updated!',
						status: 'success',
						duration: 9000,
						isClosable: true,
					});
				});
		}
	};

	const updatePlaylist = () => {
		if (formData.name.length < 10) return;

		setLoading(true);
		const body = {
			name: formData.name,
			description: formData.description,
			public: false,
			collaborative: false,
		};

		fetch(`https://api.spotify.com/v1/playlists/${data?.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(body),
		})
			.then(async () => {
				getPlaylist(data.id);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	return (
		<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
			<ModalOverlay />
			<ModalContent w="100%" overflow="hidden">
				<ModalHeader>Update Playlist</ModalHeader>
				<ModalCloseButton
					_focus={{
						boxShadow: 'none',
					}}
				/>
				<ModalBody>
					<Input
						placeholder="Title"
						marginBottom={3}
						value={formData.name}
						minLength={10}
						isInvalid={formData.name.length < 10}
						onChange={(e) =>
							setFormData({ ...formData, name: e.target.value })
						}
					/>
					<Textarea
						placeholder="Description (min 10)"
						value={formData.description}
						onChange={(e) =>
							setFormData({
								...formData,
								description: e.target.value,
							})
						}
					/>
				</ModalBody>

				<ModalFooter>
					<Button
						background="#1DB954"
						color="white"
						paddingX={8}
						isLoading={loading}
						_hover={{ background: '#1CAF50' }}
						_active={{ background: '#1CAF50' }}
						onClick={() => updatePlaylist()}
					>
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default UpdatePlaylist;
