import styles from "../popup.module.scss";
import { ChangeEvent, forwardRef } from "react";

type fileInputPropsType = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
export const FileInput = forwardRef<HTMLInputElement, fileInputPropsType>(
  (props, ref) => {
    return (
      <form className={styles.fileInputForm}>
        <input
          type="file"
          accept="image/jpeg,image/png,image/heic,image/heif,video/mp4,video/quicktime"
          ref={ref}
          multiple
          {...props}
        />
      </form>
    );
  }
);
FileInput.displayName = "FileInput";
