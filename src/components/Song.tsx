import { Box } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSong } from '../redux/reducers/songReducer';
import { Song as SongType, SongState } from '../types/types';
import AlbumText from './AlbumText';
import Button from './Button';
import Image from './Image';

interface Props {
	data: SongType;
}

function Song({ data }: Props) {
	const dispatch = useDispatch();
	const { selectedSongs } = useSelector((state: SongState) => state.song);

	return (
		<Box key={data.id}>
			<Image url={data.album.images[0].url} alt="cover" />
			<Box marginTop={2}>
				<AlbumText label="Title" data={data.name} />
				<AlbumText label="Artists" data={data.artists} />
				<AlbumText label="Album" data={data.album.name} />
				<Button
					type="button"
					onClick={() => dispatch(addSong(data))}
					value={
						selectedSongs?.includes(data) ? 'Deselect' : 'Select'
					}
					background={
						selectedSongs?.includes(data)
							? 'whiteAlpha.200'
							: 'green.500'
					}
					className={`${
						selectedSongs?.includes(data) ? 'selected' : ''
					}`}
				/>
			</Box>
		</Box>
	);
}

export default Song;
