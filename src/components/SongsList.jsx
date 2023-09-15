import React from "react";
import Song from "./Song";

const SongsList = ({ songs, currentSong, onClick }) => {
  return (
    <ul>
      {songs.map((song) => (
        <Song
          key={song.id}
          song={song}
          currentSong={currentSong}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};

export default SongsList;
