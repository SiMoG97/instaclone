import { useEffect, useRef, useState } from "react";
import styles from "./postStyles.module.scss";
import MutedSvg from "../../public/muted.svg";
import UnmutedSvg from "../../public/unmuted.svg";
type VideoPostProps = {
  src: string;
};
// type VideoTarget = {
//   target: EventTarget & HTMLVideoElement;
// };

export const VideoPost = ({ src }: VideoPostProps) => {
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);

  const handleTimeUpdate = () => {
    if (rangeRef.current && videoRef.current) {
      const vid = videoRef.current;
      const range = rangeRef.current;
      range.value = `${(vid.currentTime * 100) / vid.duration}`;
      range.style.background = `linear-gradient(to right, #fff 0%, #fff ${range.value}%, #aaaaaa7a ${range.value}%, #aaaaaa7a 100%)`;
    }
  };
  const rangeChangeHandler = () => {
    if (videoRef.current && rangeRef.current) {
      const vid = videoRef.current;
      const range = rangeRef.current;
      vid.currentTime = (Number(range.value) * vid.duration) / 100;
      range.style.background = `linear-gradient(to right, #fff 0%, #fff ${range.value}%, #aaaaaa7a ${range.value}%, #aaaaaa7a 100%)`;
    }
  };

  const togglePause = () => {
    if (videoRef.current) {
      if (paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setPaused(!paused);
    }
  };
  const muteHandler = () => {
    setMuted(!muted);
  };
  return (
    <div style={{ width: "100%", position: "relative" }}>
      <video
        style={{ width: "100%" }}
        src={src}
        autoPlay
        muted={muted}
        loop
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
      ></video>
      <div
        className={styles.pauseLayer}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            togglePause();
          }
        }}
      >
        {paused && (
          <img
            src="/play.png"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                togglePause();
              }
            }}
          />
        )}
        <div className={styles.track}>
          <input
            type="range"
            ref={rangeRef}
            className={styles.slider}
            onChange={rangeChangeHandler}
          />
        </div>
        <input
          type="range"
          className={styles.volume}
          onChange={(e) => {
            if (videoRef.current) {
              const vid = videoRef.current;
              vid.volume = Number(e.target.value) / 100;
              e.target.style.background = `linear-gradient(to right, #fff 0%, #fff ${e.target.value}%, #aaaaaa7a ${e.target.value}%, #aaaaaa7a 100%)`;
            }
          }}
        />
      </div>
      <div className={styles.muteBtn} onClick={muteHandler}>
        {muted ? <MutedSvg /> : <UnmutedSvg />}
      </div>
    </div>
  );
};
