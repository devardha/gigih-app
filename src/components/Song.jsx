import React from 'react';
import AlbumText from './AlbumText';
import Button from './Button';
import Image from './Image';

function Song({ data, selected, setSelected }) {
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
		<div key={data.id} className="song">
			<Image url={data.album.images[0].url} alt="cover" />
			<div className="detail">
				<AlbumText label="Title" data={data.name} />
				<AlbumText label="Artists" data={data.artists} />
				<AlbumText label="Album" data={data.album.name} />
				<Button
					type="button"
					onClick={() => handleSelect(data, selected, setSelected)}
					value={selected.includes(data.href) ? 'Deselect' : 'Select'}
					className={`${
						selected.includes(data.href) ? 'selected' : ''
					}`}
				/>
			</div>
		</div>
	);
}

export default Song;
