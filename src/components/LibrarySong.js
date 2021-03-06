import React from 'react';

const LibrarySong = ({song, setCurrentSong, songs, setSongs, audioRef, isPlaying}) => {

    const songSelectHandler = async () => {
        await setCurrentSong(song);
        //active song state
        const newSongs = songs.map((item)=> {
            if (item === song) { 
                return {
                    ...item,
                    active: true
                };
            } else {
                return {
                    ...item,
                    active: false
                };
            }
        });
        setSongs(newSongs);
        if (isPlaying) audioRef.current.play();
    }

    return(
        <div className={`library-songs ${song.active?'selected':''}`} onClick={songSelectHandler}>
            <img src={song.cover} alt={song.name} />
            <div className="song-desc">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
}

export default LibrarySong;