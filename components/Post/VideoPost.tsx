import { useEffect, useRef, useState } from "react";
import styles from "./postStyles.module.scss";
import MutedSvg from "../../public/muted.svg";
import UnmutedSvg from "../../public/unmuted.svg";
import Image from "next/image";
import useWindowEventHandler from "../../Hooks/useWindowEventHandler";
type VideoPostProps = {
  src: string;
  isSelected: boolean;
};

export const VideoPost = ({ src, isSelected }: VideoPostProps) => {
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);

  const playVidWhenVisible = () => {
    if (!videoRef.current) return;
    if (!isInViewport(videoRef.current) || !isSelected) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };
  useEffect(() => {
    playVidWhenVisible();
  }, [isSelected, playVidWhenVisible]);

  useWindowEventHandler(
    playVidWhenVisible,
    [isSelected, playVidWhenVisible],
    "scroll"
  );

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
    <div style={{ minWidth: "100%", position: "relative" }} draggable={false}>
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
          console.log("clicked");
          if (e.target === e.currentTarget) {
            togglePause();
          }
        }}
      >
        {paused ? (
          <div className={styles.playBtnImg}>
            <Image
              src="/play.png"
              layout="fill"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  togglePause();
                }
              }}
              alt="Play button image"
            />
          </div>
        ) : null}
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
function isInViewport(el: HTMLVideoElement) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}
