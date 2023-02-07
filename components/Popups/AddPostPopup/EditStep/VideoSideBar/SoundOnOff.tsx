import { setValues } from "framer-motion/types/render/utils/setters";
import { useEffect, useState } from "react";
import { ImgVidFileType } from "../..";
import SwitchButton from "../../../../FormComponents/SwitchButton";
import styles from "../../../popup.module.scss";
import { useForm } from "react-hook-form";

type SoundOnOffType = {
  file: ImgVidFileType;
  updateSoundOnOff(newFile: ImgVidFileType): void;
};

function SoundOnOff({ file, updateSoundOnOff }: SoundOnOffType) {
  const { register, watch, setValue } = useForm<{ soundOn: boolean }>();
  const isSoundOn = watch("soundOn");
  useEffect(() => {
    if (file.sound === isSoundOn) return;
    const newFile = { ...file, sound: isSoundOn };
    updateSoundOnOff(newFile);
  }, [isSoundOn]);

  // update sound state if the user change the current video
  useEffect(() => {
    setValue("soundOn", file.sound);
  }, [file.id]);

  return (
    <div className={styles.soundOnOffContainer}>
      <div>Sound on</div>
      <div>
        <SwitchButton
          id="soundSwitch"
          variation="large"
          {...register("soundOn")}
        />
      </div>
    </div>
  );
}

export default SoundOnOff;
