import React from "react";

const AlbumText = ({ label, data }) => {
	if (Array.isArray(data)) {
		return (
			<p>
				<span>{label}: </span>
				{data.map((item, index) => (
					<span key={index}>
						{item.name}
						{data.length > index + 1 && ", "}
					</span>
				))}
			</p>
		);
	}

	return (
		<p>
			{label}: {data}
		</p>
	);
};

export default AlbumText;
