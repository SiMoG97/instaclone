import styles from "./style.module.scss";
import { ChangeEvent, forwardRef } from "react";

type fileInputPropsType = {
  id?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onlyImg?: boolean;
  multiple?: boolean;
};
export const FileInput = forwardRef<HTMLInputElement, fileInputPropsType>(
  ({ id = "akakakakak", onlyImg = false, multiple = true, ...rest }, ref) => {
    const accepts = onlyImg
      ? "image/jpeg,image/png,image/heic,image/heif"
      : "image/jpeg,image/png,image/heic,image/heif,video/mp4,video/quicktime";
    return (
      <form className={styles.fileInputForm} method="POST">
        <input
          id={id}
          type="file"
          accept={accepts}
          ref={ref}
          multiple={multiple}
          {...rest}
        />
      </form>
    );
  }
);
FileInput.displayName = "FileInput";
