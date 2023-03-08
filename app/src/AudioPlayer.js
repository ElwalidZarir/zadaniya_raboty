import React, { useState, useRef, useEffect } from "react";
import { songsdata } from "./audio";
import "./AudioPlayer.css";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const AudioPlayer = () => {
  const [isPlaying, setIsplaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrenTime] = useState(0);
  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  const togglePlayPause = (e) => {
    const preValue = isPlaying;
    setIsplaying(!preValue);
    if (!preValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrenTime(progressBar.current.value);
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrenTime(progressBar.current.value);
  };

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  return (
    <div className="audioPlayer">
      <audio ref={audioPlayer} src={songsdata[0].url}></audio>
      <button className="playPause" onClick={togglePlayPause}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <div className="input_range">
        <input
          className="input_range"
          type="range"
          defaultValue="0"
          ref={progressBar}
          onChange={changeRange}
        />
      </div>
      <div className="duration">{calculateTime(currentTime)}</div>
    </div>
  );
};

export default AudioPlayer;
