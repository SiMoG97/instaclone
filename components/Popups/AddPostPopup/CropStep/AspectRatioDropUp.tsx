import styles from "../../popup.module.scss";
import OriginalIcon from "../../../../public/AspectRatioIcons/originalAR.svg";
import RectangleIcon from "../../../../public/AspectRatioIcons/rectangle.svg";
import RectangleVIcon from "../../../../public/AspectRatioIcons/rectangleV.svg";
import OneToOneIcon from "../../../../public/AspectRatioIcons/oneToOne.svg";
import { ARStateType } from ".";
import { IconPopup } from "../IconPopup";
import CropIcon from "../../../../public/crop.svg";

type AspectRatioDropUpProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  aspectRatio: ARStateType;
  setAspectRatio: React.Dispatch<React.SetStateAction<ARStateType>>;
};
const AspectRatioDropUp = ({
  isOpen,
  setIsOpen,
  aspectRatio,
  setAspectRatio,
}: AspectRatioDropUpProps) => {
  return (
    <IconPopup
      someDropOpen={isOpen}
      setSomeDropOpen={setIsOpen}
      Icon={CropIcon}
      style={{ left: "2rem", zIndex: "1" }}
      DropUp={
        <ARList aspectRatio={aspectRatio} setAspectRatio={setAspectRatio} />
      }
    />
  );
};

export default AspectRatioDropUp;

type ARDropUpProps = {
  aspectRatio: ARStateType;
  setAspectRatio: React.Dispatch<React.SetStateAction<ARStateType>>;
};
function ARList({ aspectRatio, setAspectRatio }: ARDropUpProps) {
  const originalAR = () => {
    setAspectRatio(() => "original");
  };
  const oneToOneAR = () => {
    setAspectRatio(() => "oneToOne");
  };
  const fourToFiveAR = () => {
    setAspectRatio(() => "fourToFive");
  };
  const sixteenToNineAR = () => {
    setAspectRatio(() => "sixteenToNine");
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
