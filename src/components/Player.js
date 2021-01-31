import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Player = ({currentSong, setCurrentSong, isPlaying, setIsPlaying, audioRef, setSongInfo, songInfo, songs, setSongs}) => {

    const activeLibraryHandler =(nextPrev)=>{
        //active song state
        const newSongs = songs.map((item)=> {
            if (item.id === nextPrev.id) { 
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
        
    };

    //Event handlers
    const playsongHandler = () => {
        if(isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }
    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song)=> song.id === currentSong.id);
        if(direction === 'forward') {
            if((currentIndex+1) === songs.length){
                await setCurrentSong(songs[0]);
                activeLibraryHandler(songs[0]);
            } else {
                await setCurrentSong(songs[currentIndex+1]);
                activeLibraryHandler(songs[currentIndex+1]);
            }
        }
        if(direction === 'backward') {
            if(currentIndex === 0){
                await setCurrentSong(songs[songs.length -1]);
                activeLibraryHandler(songs[songs.length -1]);
                if (isPlaying) audioRef.current.play();
            } else {
                await setCurrentSong(songs[currentIndex-1]);
                activeLibraryHandler(songs[currentIndex-1]);
            }
        }
        if (isPlaying) audioRef.current.play();

    }
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo,currentTime: e.target.value})
    }

    //Supporter
    const formatTime = (time) => {
        return (
           Math.floor(time / 60)+":"+ ("0"+Math.floor(time % 60)).slice(-2)
        );
    }

    //styles
    const trackAnim ={
        transform: `translateX(${songInfo.trackProgress}%)`
    }

    return(
        <div className="player">
            <div className="time-control">
                <span>{formatTime(songInfo.currentTime)}</span>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
                    <input type="range" 
                    min={0} 
                    max={songInfo.duration || 0} 
                    value={songInfo.currentTime}
                    onChange={dragHandler}
                    />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <span>{formatTime(songInfo.duration || 0)}</span>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={()=>skipTrackHandler('backward')} className="skip-backward" icon={faAngleLeft} size="2x" />
                <FontAwesomeIcon onClick={playsongHandler} className="play" icon={isPlaying ? faPause : faPlay} size="2x" />
                <FontAwesomeIcon onClick={()=>skipTrackHandler('forward')} className="skip-forward" icon={faAngleRight} size="2x" />
            </div>
        </div>
    );
}

export default Player;