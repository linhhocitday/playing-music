import React, { useEffect, useState } from "react";

const CurrentSongLength = ({
  songLength,
  currentTime,
  onChange,
  onMousedDown,
  onMousedUp,
  audioRef,
}) => {
  const [remainingPercentage, setRemainingPercentage] = useState(100);

  useEffect(() => {
    const handlePercentageChange = () => {
      setRemainingPercentage(
        100 - (audioRef.current.currentTime * 100) / audioRef.current.duration
      );
    };

    audioRef.current.addEventListener("timeupdate", handlePercentageChange);

    return () => {
      audioRef.current.removeEventListener(
        "timeupdate",
        handlePercentageChange
      );
    };
  }, []);

  return (
    <div className="time-range-wrapper">
      <input
        className="time-range"
        type="range"
        min="0"
        max={songLength}
        step="1"
        value={currentTime}
        onChange={onChange}
        onMouseDown={onMousedDown}
        onMouseUp={onMousedUp}
      />
      <div
        className="current-time-line"
        style={{ right: `${remainingPercentage}%` }}
      ></div>
    </div>
  );
};

export default CurrentSongLength;
