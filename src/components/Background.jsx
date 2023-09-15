import React from "react";

const Background = ({ currentSong }) => {
  return (
    <div className="background-wrapper">
      <div
        className="background-img"
        style={
          currentSong
            ? { backgroundImage: `url(${currentSong.background})` }
            : { backgroundColor: "#060047" }
        }
      ></div>
      <div className="background-gradient"></div>
    </div>
  );
};

export default Background;
