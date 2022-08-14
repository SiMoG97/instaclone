import styles from "../popup.module.scss";
import PicVidIcon from "../../../public/picVideoImp.svg";
import ExclamIcon from "../../../public/exclamation.svg";
import Button from "../../Button";
import { ChangeEvent, DragEvent, useMemo, useRef, useState } from "react";
import { FileInput } from "./FileInput";
import FileExtChecker from "../../../utils/FileExtChecker";

export function ImportImgStep() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState({
    error: false,
    filename: "",
    errorName: "",
    errorMessage: {
      title: "",
      message: "",
    },
  });
  const errorMessages = useMemo(
    () => [
      {
        title: "This file is not supported",
        message: " could not be uploaded.",
      },
      {
        title: "Files must be 4KB or more",
        message:
          " is too small. To continue, choose a file that's 4KB or more.",
      },
    ],
    []
  );

  function buttonClicked() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }
  function dragFileEnter() {
    setDragOver(() => true);
  }
  function dragFileleave() {
    setDragOver(() => false);
  }
  function dragFileOver(e: DragEvent) {
    e.preventDefault();
  }
  function dropFile(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(() => false);
    const files = e.dataTransfer.files;
    validteFiles(files);
  }
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      validteFiles(files);
    }
  }
  function validteFiles(files: FileList) {
    const arrFiles = Object.keys(files).map((obj: any) => files[obj]);
    if (arrFiles.length > 10) return;

    arrFiles.forEach((file) => {
      const fileSize = file.size;
      const filename = file.name;
      if (!FileExtChecker(filename)) {
        setFileError(() => ({
          error: true,
          filename,
          errorName: "notValidFile",
          errorMessage: errorMessages[0],
        }));
        return;
      }
      if (fileSize < 4096) {
        setFileError(() => ({
          error: true,
          filename,
          errorName: "smallFile",
          errorMessage: errorMessages[1],
        }));
        return;
      }
    });
    if (inputRef.current && files) {
      inputRef.current.files = files;
      console.log("input files : ", inputRef.current.files);
    }
  }
  return (
    <>
      <div
        className={`${styles.importImgStep} ${styles.stepContainer}`}
        onDrop={dropFile}
        onDragOver={dragFileOver}
        onDragEnter={dragFileEnter}
        onDragLeave={dragFileleave}
        // onDragEnd={() => {}}
      >
        <div
          style={{ pointerEvents: dragOver ? "none" : "all" }}
          className={styles.dragPhotosAndVideosParent}
        >
          {!fileError.error ? (
            <>
              <PicVidIcon className={` ${dragOver && styles.changeSvgColor}`} />
              <div style={{ padding: "1rem", paddingBottom: "1.5rem" }}>
                Drag photos and videos here
              </div>
              <Button
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  padding: ".8rem 1.4rem",
                  letterSpacing: ".05rem",
                }}
                onClick={buttonClicked}
              >
                Select from computer
              </Button>
            </>
          ) : (
            <>
              <ExclamIcon className={` ${dragOver && styles.changeSvgColor}`} />
              <div style={{ padding: "1rem", paddingBottom: "1.5rem" }}>
                {fileError.errorMessage.title}
                {/* {fileError.errorName === "smallFile"} */}
                <div
                  style={{
                    color: "var(--txt-c-2)",
                    fontSize: "1.4rem",
                    padding: ".5rem 0",
                  }}
                >
                  <strong>{fileError.filename}</strong>
                  {fileError.errorMessage.message}
                </div>
              </div>
              <Button
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  padding: ".8rem 1.4rem",
                  letterSpacing: ".05rem",
                }}
                onClick={buttonClicked}
              >
                Select other files
              </Button>
            </>
          )}
        </div>
      </div>
      <FileInput ref={inputRef} onChange={handleInputChange} />
    </>
  );
}
