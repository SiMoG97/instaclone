import { setValues } from "framer-motion/types/render/utils/setters";
import { useEffect, useState } from "react";
import { ImgVidFileType } from "../..";
import SwitchButton from "../../../../FormComponents/SwitchButton";
import styles from "../../../popup.module.scss";

type SoundOnOffType = {
  file: ImgVidFileType;
  updateSoundOnOff(newFile: ImgVidFileType): void;
};

function SoundOnOff({ file, updateSoundOnOff }: SoundOnOffType) {
  const [isSoundOn, setIsSoundOn] = useState(file.sound);

  useEffect(() => {
    if (file.sound === isSoundOn) return;
    const newFile = { ...file, sound: isSoundOn };
    updateSoundOnOff(newFile);
  }, [isSoundOn]);

  // update sound state if the user change the current video
  useEffect(() => {
    setIsSoundOn(() => file.sound);
  }, [file.id]);

  return (
    <div className={styles.soundOnOffContainer}>
      <div>Sound on</div>
      <div>
        <SwitchButton
          id="soundSwitch"
          isChecked={isSoundOn}
          clickHandler={() => {
            setIsSoundOn((prev) => !prev);
          }}
          variation="large"
        />
      </div>
    </div>
  );
}

export default SoundOnOff;