import {
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

const CreateNewPlaylist = ({ modalOpen, setModalOpen }: any) => (
	<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
		<ModalOverlay />
		<ModalContent w="100%" overflow="hidden">
			<ModalHeader>Create Playlist</ModalHeader>
			<ModalCloseButton
				_focus={{
					boxShadow: 'none',
					border: 'none',
					outline: 'none',
				}}
			/>
			<ModalBody>
				<Input placeholder="Title" marginBottom={3} />
				<Textarea placeholder="Description (min 10)" />
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

export default CreateNewPlaylist;
