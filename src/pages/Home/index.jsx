import AlbumText from "../../components/AlbumText";
import Button from "../../components/Button";
import Image from "../../components/Image";
import song from "../../data/song";

const Home = () => {
  return (
    <div id="playlist">
      <Image url={song.album.images[0].url} alt="cover" />
      <AlbumText label="Title" data={song.name} />
      <AlbumText label="Artists" data={song.artists} />
      <AlbumText label="Album" data={song.album.name} />
      <Button />
    </div>
  );
};

export default Home;
