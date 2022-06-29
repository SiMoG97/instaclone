import { useEffect, useRef, useState } from "react";
import styles from "./postStyles.module.scss";
import MutedSvg from "../../public/muted.svg";
import UnmutedSvg from "../../public/unmuted.svg";
import Image from "next/image";
type VideoPostProps = {
  src: string;
};
type VideoTarget = {
  target: EventTarget & HTMLVideoElement;
};

export const VideoPost = ({ src }: VideoPostProps) => {
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tracker = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (videoRef.current) {
  //     videoRef.current.addEventListener("timeupdate", (event) => {
  //       console.log("updating");
  //     });
  //   }
  // }, []);
  const handleTimeUpdate = () => {
    if (tracker.current && videoRef.current) {
      const vid = videoRef.current;
      const track = tracker.current;
      // console.log(vid.duration);
      track.style.width = `${(vid.currentTime * 100) / vid.duration}%`;
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
        <div
          className={styles.track}
          onDragStart={(e) => {
            const elem = e.currentTarget.cloneNode(true) as Element;
            e.dataTransfer.setDragImage(elem, 0, 0);
          }}
          onDrag={(e) => {
            e.preventDefault();
            e.dataTransfer.effectAllowed = "copyMove";
            const { currentTarget } = e;
            const rect = currentTarget.getBoundingClientRect();

            if (tracker.current && videoRef.current) {
              // videoRef.current.currentTime =
              let dragPos = `${e.clientX - rect.left}px`;
              if (e.clientX - rect.left <= 0) {
                dragPos = "0px";
              } else if (e.clientX - rect.left >= rect.right) {
                dragPos = "100%";
              }
              tracker.current.style.width = dragPos;
            }
            // console.log(e.clientX - rect.left);
          }}
          onClick={(e) => {
            // console.log(e);
            // console.log(e.pageX - e.target.offsetLeft);
          }}
          onMouseDown={() => {
            console.log("draging");
          }}
          draggable
        >
          <div className={styles.tracker} ref={tracker}></div>
        </div>
      </div>
      <div className={styles.muteBtn} onClick={muteHandler}>
        {muted ? <MutedSvg /> : <UnmutedSvg />}
      </div>
    </div>
  );
};
