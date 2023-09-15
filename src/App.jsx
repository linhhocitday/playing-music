import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Player from "./components/Player";
import Background from "./components/Background";
import SongsList from "./components/SongsList";
import CurrentSongLength from "./components/CurrentSongLength";

const songs = [
  {
    id: 1,
    title: "Thấy chưa",
    artist: "Vũ Đinh Trọng Thắng",
    cover: "thay-chua.jpg",
    background: "thay-chua-bg.jpg",
    src: "thay-chua.mp3",
  },
  {
    id: 2,
    title: "Đưa em về nhà",
    artist: "GREY D x Chillies",
    cover: "dua-em-ve-nha.jpg",
    background: "dua-em-ve-nha-bg.png",
    src: "dua-em-ve-nha.mp3",
  },
  {
    id: 3,
    title: "Mất kết nối",
    artist: "Cá hồi hoang",
    cover: "mat-ket-noi.jpg",
    background: "mat-ket-noi-bg.jpg",
    src: "mat-ket-noi.mp3",
  },
  {
    id: 4,
    title: "Tôi biết em không biết",
    artist: "Kiên",
    cover: "toi-biet-em-khong-biet.jpg",
    background: "toi-biet-em-khong-biet-bg.jpg",
    src: "toi-biet-em-khong-biet.mp3",
  },
  {
    id: 5,
    title: "Bên trái",
    artist: "Kiên",
    cover: "ben-trai.jpg",
    background: "ben-trai-bg.jpg",
    src: "ben-trai.mp3",
  },
];

const App = () => {
  const audioRef = useRef(new Audio());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isChangingTime, setIsChangingTime] = useState(false);

  const repeatSong = () => {
    audioRef.current.loop = !isRepeat;
    setIsRepeat((isRepeat) => !isRepeat);
  };

  const shuffleSong = () => {
    let randomNumber = Math.floor(Math.random() * (songs.length - 1));

    setCurrentSong(songs[randomNumber]);

    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!currentSong) {
      setCurrentSong(songs[0]);
    }

    setIsPlaying(!isPlaying);
  };

  const prevSong = () => {
    if (currentSong.id === 1) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[songs.indexOf(currentSong) - 1]);
    }
  };

  const nextSong = () => {
    setCurrentSong(songs[(songs.indexOf(currentSong) + 1) % songs.length]);
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handleDurationChange = () => {
      setDuration(audio.duration);
    };

    const handleTimeChange = () => {
      setCurrentTime(audio.currentTime);
    };

    // const handleEnd = () => {
    //   if (isRepeat) {
    //     console.log(isRepeat);
    //     audioRef.current.loop = true;
    //     audioRef.current.load();
    //     audioRef.current.play();
    //   } else {
    //     nextSong();
    //   }
    // };

    audio.addEventListener("loadedmetadata", handleDurationChange);
    audio.addEventListener("timeupdate", handleTimeChange);
    // audio.addEventListener("ended", handleEnd);

    return () => {
      audio.removeEventListener("loadedmetadata", handleDurationChange);
      audio.removeEventListener("timeupdate", handleTimeChange);
      // audio.removeEventListener("ended", handleEnd);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current.ended) {
      if (!isRepeat) {
        nextSong();

        console.log(isRepeat);
      } else {
        audioRef.current.load();
        audioRef.current.play();

        console.log(isRepeat);
      }
    }
  }, [audioRef.current.ended]);

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.src;
    }
  }, [currentSong]);

  useEffect(() => {
    if (isChangingTime && !audioRef.current.paused) {
      audioRef.current.pause();
    } else if (songs.indexOf(currentSong) !== -1 && isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [currentSong, isPlaying, isChangingTime]);

  const selectSong = (id) => {
    const song = songs.find((song) => song.id === id);

    if (song) {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const changeTime = (e) => {
    audioRef.current.currentTime = e.target.value;
  };

  const timeFormatter = (time) => {
    let minutes = Math.floor(time / 60);
    if (minutes <= 9) {
      minutes = `0${minutes}`;
    }

    let seconds = Math.ceil(time % 60);
    if (seconds <= 9) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  };

  const muteVolume = () => {
    setIsChangingTime(true);
  };

  const unMuteVolume = () => {
    setIsChangingTime(false);
  };

  return (
    <>
      <Background currentSong={currentSong} />

      <div className="container">
        <div className="grid-container">
          <div className="list-wrapper">
            <p className="uppercase">Hear the tracks you’ve liked:</p>
            <h1 className="uppercase">Your list</h1>

            <SongsList
              songs={songs}
              currentSong={currentSong}
              onClick={selectSong}
            />
          </div>
        </div>
      </div>

      <div className="current-song-block">
        <div className="current-song-img">
          <div
            className="img"
            style={
              currentSong && { backgroundImage: `url(${currentSong.cover})` }
            }
          ></div>
        </div>

        <h2 className="current-song-name">
          {currentSong && currentSong.title}
        </h2>
        <h3 className="current-artist-name">
          {currentSong && currentSong.artist}
        </h3>

        <CurrentSongLength
          songLength={duration}
          currentTime={currentTime}
          onChange={changeTime}
          isPlaying={isPlaying}
          onMousedDown={muteVolume}
          onMousedUp={unMuteVolume}
          audioRef={audioRef}
        />

        <div className="current-song-time">
          <span>{timeFormatter(currentTime)}</span>
          <span>{timeFormatter(audioRef.current.duration)}</span>
        </div>

        <Player
          isPlaying={isPlaying}
          onToggle={togglePlay}
          onPrev={prevSong}
          onNext={nextSong}
          onRepeat={repeatSong}
          repeat={isRepeat}
          onShuffle={shuffleSong}
        />
      </div>
    </>
  );
};

export default App;
