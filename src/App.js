import React, {useState, useRef} from 'react';
//Adding styles
import './styles/app.scss';
//Adding components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';
//Adding util
import data from './data';
import { library } from '@fortawesome/fontawesome-svg-core';

function App() {
  //Ref
  const audioRef = useRef(null); // null is the initial value
  //State
  const [songs,setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying,setIsPlaying] = useState(false);
  const [songInfo,setSongInfo] = useState({
      currentTime: 0,
      duration: 0
  });
  const [libraryStatus,setLibraryStatus] = useState(false);

  const timeUpdateHandler = (e) => {
      const currTime = e.target.currentTime;
      const duration = e.target.duration;
      setSongInfo({...songInfo, currentTime: currTime, duration: duration})
  }

  return (
    <div className="App">
      <Nav 
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <Song currentSong={currentSong} />
      <Player 
      songInfo={songInfo}
      setSongInfo={setSongInfo}
      audioRef={audioRef}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      currentSong={currentSong} 
      setCurrentSong={setCurrentSong}
      songs={songs}
      setSongs={setSongs}
      />
      <Library 
        libraryStatus={libraryStatus}
        songs={songs} 
        setSongs={setSongs}
        setCurrentSong={setCurrentSong} 
        audioRef={audioRef}
        isPlaying={isPlaying}
        />
      <audio 
          ref={audioRef} 
          src={currentSong.audio} 
          onTimeUpdate={timeUpdateHandler}
          onLoadedMetadata={timeUpdateHandler}
      ></audio>
    </div>
  );
}

export default App;
