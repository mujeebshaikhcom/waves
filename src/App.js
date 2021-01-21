import React, {useState} from 'react';
//Adding styles
import './styles/app.scss';
//Adding components
import Player from './components/Player';
import Song from './components/Song';
//Adding util
import data from './util';

function App() {
  //State
  const [songs,setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);

  return (
    <div className="App">
      <h1>Waves -Music Player</h1>
      <Song currentSong={currentSong} />
      <Player currentSong={currentSong} />
    </div>
  );
}

export default App;
