import song from "./data/song";
import "./App.css";
import AlbumText from "./components/AlbumText";

function App() {
  return (
    <div className="App">
      <div id="playlist">
        <img src={song.album.images[0].url} alt="cover" />
        <AlbumText label="Title" data={song.name} />
        <AlbumText label="Artists" data={song.artists} />
        <AlbumText label="Album" data={song.album.name} />
        <button>Select</button>
      </div>
    </div>
  );
}

export default App;
