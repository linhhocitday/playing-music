import React, { useState } from "react";

import {
  MdShuffle,
  MdSkipPrevious,
  MdPlayArrow,
  MdPause,
  MdSkipNext,
  MdRepeat,
  MdRepeatOne,
} from "react-icons/md";

const Player = ({
  isPlaying,
  onToggle,
  onPrev,
  onNext,
  onRepeat,
  repeat,
  onShuffle,
}) => {
  return (
    <div className="player">
      <div className="player-wrapper">
        <div className="btn-wrapper">
          <button className="player-btn" onClick={onShuffle}>
            <MdShuffle />
          </button>
        </div>

        <div className="btn-wrapper">
          <button className="player-btn" onClick={onPrev}>
            <MdSkipPrevious />
          </button>
        </div>

        <div className="btn-circle">
          <button className="player-btn player-toggle-btn" onClick={onToggle}>
            {!isPlaying ? <MdPlayArrow /> : <MdPause />}
          </button>
        </div>

        <div className="btn-wrapper">
          <button className="player-btn" onClick={onNext}>
            <MdSkipNext />
          </button>
        </div>

        <div className="btn-wrapper">
          <button className="player-btn" onClick={onRepeat}>
            {!repeat ? <MdRepeat /> : <MdRepeatOne />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
