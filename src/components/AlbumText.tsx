import React from 'react';

function AlbumText({ label, data }) {
	if (Array.isArray(data)) {
		return (
			<p>
				{data.map((item, index) => (
					<span key={index}>
						{item.name}
						{data.length > index + 1 && ', '}
					</span>
				))}
			</p>
		);
	}

	return (
		<p
			style={{
				fontWeight: label === 'Title' ? 700 : 400,
				color: label === 'Title' ? '#ffffff' : '#888888',
			}}
		>
			{data}
		</p>
	);
}

export default AlbumText;
