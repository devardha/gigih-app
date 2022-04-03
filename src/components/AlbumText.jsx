import React from "react";

const AlbumText = ({ label, data }) => {
	if (Array.isArray(data)) {
		return (
			<p>
				{data.map((item, index) => (
					<span key={index}>
						{item.name}
						{data.length > index + 1 && ", "}
					</span>
				))}
			</p>
		);
	}

	return <p style={{ fontWeight: label === "Title" ? 700 : 400 }}>{data}</p>;
};

export default AlbumText;
