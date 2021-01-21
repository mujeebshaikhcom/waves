import React, {useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const Player = ({currentSong}) => {
    //Ref
    const audioRef = useRef(null); // null is the initial value

    //Event handlers
    const playsongHandler = () => {
        console.log(audioRef.current);
    }
    const skipBacksongHandler = () => {
        console.log(audioRef);
    }
    const skipForwSongHandler = () => {
        console.log(audioRef);
    }
    return(
        <div className="player">
            <div className="time-control">
                <span>Start Time</span>
                <input type="range" name="" id=""/>
                <span>End Time</span>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={skipBacksongHandler} className="skip-backward" icon={faAngleLeft} size="2x" />
                <FontAwesomeIcon onClick={playsongHandler} className="play" icon={faPlay} size="2x" />
                <FontAwesomeIcon onClick={skipForwSongHandler} className="skip-forward" icon={faAngleRight} size="2x" />
            </div>
            <audio ref={audioRef} src={currentSong.audio}></audio>
        </div>
    );
}

export default Player;