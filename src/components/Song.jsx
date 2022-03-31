import React from "react";
import AlbumText from "./AlbumText";
import Button from "./Button";
import Image from "./Image";

const Song = ({ data, selected }) => {
	return (
		<div key={data.id} className="song">
			<Image url={data.album.images[0].url} alt="cover" />
			<div className="detail">
				<AlbumText label="Title" data={data.name} />
				<AlbumText label="Artists" data={data.artists} />
				<AlbumText label="Album" data={data.album.name} />
				<Button
					value={selected === data.href ? "Deselect" : "Select"}
				/>
			</div>
		</div>
	);
};

export default Song;
