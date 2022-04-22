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
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { SongState } from '../types/types';

const CreateNewPlaylist = ({ modalOpen, setModalOpen }: any) => {
	const { selectedSongs } = useSelector((state: SongState) => state.song);

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
					<Input placeholder="Title" marginBottom={3} />
					<Textarea
						placeholder="Description (min 10)"
						minLength={10}
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
						background="green.500"
						color="white"
						_hover={{ background: 'green.500' }}
						_active={{ background: 'green.600' }}
					>
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CreateNewPlaylist;
