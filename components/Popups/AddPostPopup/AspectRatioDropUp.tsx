import styles from "../popup.module.scss";
import OriginalIcon from "../../../public/AspectRatioIcons/originalAR.svg";
import RectangleIcon from "../../../public/AspectRatioIcons/rectangle.svg";
import RectangleVIcon from "../../../public/AspectRatioIcons/rectangleV.svg";
import OneToOneIcon from "../../../public/AspectRatioIcons/oneToOne.svg";
import { Dispatch, SetStateAction } from "react";
import { ARStateType } from "./CropStep";

type ARDropUpProps = {
  aspectRatio: ARStateType;
  setAspectRatio: Dispatch<SetStateAction<ARStateType>>;
};

export function AspectRatioDropUp({
  aspectRatio,
  setAspectRatio,
}: ARDropUpProps) {
  const originalAR = () => {
    setAspectRatio(() => "original");
    console.log(aspectRatio);
  };
  const oneToOneAR = () => {
    setAspectRatio(() => "oneToOne");
    console.log(aspectRatio);
  };
  const fourToFiveAR = () => {
    setAspectRatio(() => "fourToFive");
    console.log(aspectRatio);
  };
  const sixteenToNineAR = () => {
    setAspectRatio(() => "sixteenToNine");
    console.log(aspectRatio);
  };

  return (
    <ul className={styles.dropUpIElmContainer}>
      <li
        onClick={originalAR}
        className={aspectRatio === "original" ? styles.active : ""}
      >
        <div>Original</div>
        <OriginalIcon />
      </li>
      <li
        onClick={oneToOneAR}
        className={aspectRatio === "oneToOne" ? styles.active : ""}
      >
        <div>1:1</div>
        <OneToOneIcon />
      </li>
      <li
        onClick={fourToFiveAR}
        className={aspectRatio === "fourToFive" ? styles.active : ""}
      >
        <div>4:5</div>
        <RectangleVIcon />
      </li>
      <li
        onClick={sixteenToNineAR}
        className={aspectRatio === "sixteenToNine" ? styles.active : ""}
      >
        <div>16:9</div>
        <RectangleIcon />
      </li>
    </ul>
  );
}
