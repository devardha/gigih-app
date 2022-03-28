import AlbumText from "../../components/AlbumText";
import Button from "../../components/Button";
import Image from "../../components/Image";
import songs from "../../data/songs";

const Home = () => {
	return (
		<div id="playlist">
			{songs.map((item) => (
				<div key={item.id} className="song">
					<Image url={item.album.images[0].url} alt="cover" />
					<div className="detail">
						<AlbumText label="Title" data={item.name} />
						<AlbumText label="Artists" data={item.artists} />
						<AlbumText label="Album" data={item.album.name} />
						<Button />
					</div>
				</div>
			))}
		</div>
	);
};

export default Home;
