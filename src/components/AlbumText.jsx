const AlbumText = ({ label, data }) => {
  if (Array.isArray(data)) {
    return (
      <p>
        {label}: 1
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
