import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const Player = ({currentSong, setCurrentSong, isPlaying, setIsPlaying, audioRef, setSongInfo, songInfo, songs, setSongs}) => {

    // useEffect
    useEffect(()=>{
        //active song state
        const newSongs = songs.map((item)=> {
            if (item === currentSong) { 
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
        
    },[currentSong]);

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
    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song)=> song.id === currentSong.id);
        if(direction === 'forward') {
            if((currentIndex+1) === songs.length){
                setCurrentSong(songs[0]);
            } else {
                setCurrentSong(songs[currentIndex+1]);
            }
        }
        if(direction === 'backward') {
            if(currentIndex === 0){
                setCurrentSong(songs[songs.length -1]);
            } else {
                setCurrentSong(songs[currentIndex-1]);
            }
        }
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

    return(
        <div className="player">
            <div className="time-control">
                <span>{formatTime(songInfo.currentTime)}</span>
                <input type="range" 
                min={0} 
                max={songInfo.duration || 0} 
                value={songInfo.currentTime}
                onChange={dragHandler}
                />
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