import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
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
import { Song, SongState, UserState } from '../types/types';

interface Props {
	modalOpen: boolean;
	setModalOpen(arg1: boolean): void;
}

const CreateNewPlaylist = ({ modalOpen, setModalOpen }: Props) => {
	const { selectedSongs } = useSelector((state: SongState) => state.song);
	const { user, accessToken } = useSelector((state: UserState) => state.user);

	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		description: '',
	});

	const toast = useToast();

	const addSongToPlaylist = async (playlistID: string) => {
		const filtered: Song[] = selectedSongs;

		const uris =
			filtered.length > 0 ? filtered.map((item) => item.uri) : [];

		const body = {
			uris,
			position: 0,
		};

		fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(body),
		})
			.then((response) => response.json())
			.then(() => {
				setLoading(false);
				setModalOpen(false);
				toast({
					title: 'Playlist created!',
					description: 'Playlist has been created',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			})
			.catch((err) => {
				setLoading(false);
			});
	};

	const createPlaylist = () => {
		if (formData.name.length < 10) return;

		setLoading(true);
		const body = {
			name: formData.name,
			description: formData.description,
			public: false,
			collaborative: false,
		};

		fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(body),
		})
			.then((response) => response.json())
			.then((res) => {
				addSongToPlaylist(res.id);
			})
			.catch((err) => {
				setLoading(false);
			});
	};

	const renderSongsName = (list) =>
		list.map((item, index) => {
			if (list.length === index + 1) {
				return item.name;
			}

			return `${item.name}, `;
		});

	return (
		<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
			<ModalOverlay />
			<ModalContent w="100%" overflow="hidden">
				<ModalHeader>Create Playlist</ModalHeader>
				<ModalCloseButton
					_focus={{
						boxShadow: 'none',
					}}
				/>
				<ModalBody>
					<Input
						placeholder="Title (min 10)"
						marginBottom={3}
						value={formData.name}
						minLength={10}
						isInvalid={formData.name.length < 10}
						onChange={(e) =>
							setFormData({ ...formData, name: e.target.value })
						}
					/>
					<Textarea
						placeholder="Description"
						value={formData.description}
						onChange={(e) =>
							setFormData({
								...formData,
								description: e.target.value,
							})
						}
					/>
					<Accordion allowMultiple marginTop={5}>
						<AccordionItem border="none">
							<h2>
								<AccordionButton
									background="green.100"
									border="none"
									_hover={{
										background: 'green.100',
									}}
									_focus={{
										boxShadow: 'none',
									}}
								>
									<Box flex="1" textAlign="left">
										{selectedSongs.length} Songs selected
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								{renderSongsName(selectedSongs)}
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
				</ModalBody>

				<ModalFooter>
					<Button
						background="#1DB954"
						color="white"
						paddingX={8}
						isLoading={loading}
						_hover={{ background: '#1CAF50' }}
						_active={{ background: '#1CAF50' }}
						onClick={() => createPlaylist()}
					>
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CreateNewPlaylist;
