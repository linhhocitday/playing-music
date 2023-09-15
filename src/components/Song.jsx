import React, { useEffect, useRef, useState } from "react";
import { MdPlayArrow, MdPause } from "react-icons/md";

const Song = ({ song, currentSong, onClick }) => {
  const [songLength, setSongLength] = useState();

  let audio = useRef(new Audio(song.src));

  useEffect(() => {
    const getSongLength = () => {
      const time = audio.current.duration;

      let minutes = Math.floor(time / 60);
      if (minutes <= 9) {
        minutes = `0${minutes}`;
      }

      let seconds = Math.ceil(time % 60);
      if (seconds <= 9) {
        seconds = `0${seconds}`;
      }

      setSongLength(`${minutes}:${seconds}`);
    };

    audio.current.addEventListener("loadedmetadata", getSongLength);

    return () => {
      audio.current.removeEventListener("loadedmetadata", getSongLength);
    };
  }, []);

  return (
    <li className="song" onClick={() => onClick(song.id)}>
      {currentSong && currentSong.id === song.id ? (
        <MdPause className="icon" />
      ) : (
        <MdPlayArrow className="icon" />
      )}

      <div
        className="img"
        style={{ backgroundImage: `url(${song.cover})` }}
      ></div>

      <div>
        <p className="song-name">{song.title}</p>
        <p className="artist-name">{song.artist}</p>
      </div>
      <p className="time">{songLength}</p>
    </li>
  );
};

export default Song;
