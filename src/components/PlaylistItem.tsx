import { Box } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSong } from '../redux/reducers/songReducer';
import { Song as SongType, SongState } from '../types/types';
import AlbumText from './AlbumText';
import Button from './Button';
import Image from './Image';

interface Props {
	data: any;
}

function PlaylistItem({ data }: Props) {
	return (
		<Box key={data.id}>
			<Image url={data.images[0].url} alt="cover" />
			<Box marginTop={2}>
				<AlbumText label="Title" data={data.name} />
				<AlbumText
					label="Owner"
					data={`by ${data.owner.display_name}`}
				/>
				{/* <AlbumText label="Artists" data={data.artists} />
				<AlbumText label="Album" data={data.album.name} /> */}
			</Box>
		</Box>
	);
}

export default PlaylistItem;
