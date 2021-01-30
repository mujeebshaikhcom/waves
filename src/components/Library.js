import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({songs,setSongs,setCurrentSong,audioRef,isPlaying, libraryStatus}) => {
    return (
        <div className={`library ${libraryStatus?'library-show':''}`}>
            <h2>Library</h2>
            <div className="library-songs-wrapper">
                {songs.map(song => {
                    return <LibrarySong 
                        song={song} 
                        setCurrentSong={setCurrentSong} 
                        songs={songs} 
                        setSongs={setSongs}
                        key={song.id}
                        audioRef={audioRef}
                        isPlaying={isPlaying}
                        />
                })}
            </div>
        </div>
    );
}

export default Library;