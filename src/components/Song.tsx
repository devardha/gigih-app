import { Box } from '@chakra-ui/react';
import React from 'react';
import { Song as SongType } from '../types/types';
import AlbumText from './AlbumText';
import Button from './Button';
import Image from './Image';

interface Props {
	data: SongType;
	selected: string[];
	setSelected(arg1: string[]): void;
}

function Song({ data, selected, setSelected }: Props) {
	const handleSelect = (song, selected, setSelected) => {
		if (selected.includes(song.href)) {
			const filtered = selected.filter((item) => item !== song.href);
			setSelected(filtered);
		} else {
			const newList = [...selected, song.href];
			setSelected(newList);
		}
	};

	return (
		<Box key={data.id}>
			<Image url={data.album.images[0].url} alt="cover" />
			<Box marginTop={2}>
				<AlbumText label="Title" data={data.name} />
				<AlbumText label="Artists" data={data.artists} />
				<AlbumText label="Album" data={data.album.name} />
				<Button
					type="button"
					onClick={() => handleSelect(data, selected, setSelected)}
					value={
						selected?.includes(data.href) ? 'Deselect' : 'Select'
					}
					background={
						selected?.includes(data.href) ? 'black' : 'green.300'
					}
					className={`${
						selected?.includes(data.href) ? 'selected' : ''
					}`}
				/>
			</Box>
		</Box>
	);
}

export default Song;
