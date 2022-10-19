import styles from "../popup.module.scss";
import PicVidIcon from "../../../public/picVideoImp.svg";
import ExclamIcon from "../../../public/exclamation.svg";
import Button from "../../Button";
import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
import { FileInput } from "../../FormComponents/FileInput";
import FileExtChecker from "../../../utils/FileExtChecker";
import { ImgFileType } from ".";

type ImportImgStepProps = {
  setFiles: Dispatch<SetStateAction<ImgFileType[]>>;
  nextStep: () => void;
  setAlertMessage: Dispatch<SetStateAction<string>>;
};

export function ImportImgStep({
  setFiles,
  nextStep,
  setAlertMessage,
}: ImportImgStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState({
    error: false,
    filename: "",
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
    if (inputRef.current) {
      inputRef.current.files = e.dataTransfer.files;
      validteFiles(inputRef.current.files);
    }
  }
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      validteFiles(files);
    }
  }
  function validteFiles(files: FileList) {
    let arrFiles = Object.keys(files)
      .map((obj: any) => files[obj])
      .slice(0, 10);

    let uploadError = false;
    for (const file of arrFiles) {
      const fileSize = file.size;
      const filename = file.name;
      if (!FileExtChecker(filename)) {
        setFileError(() => ({
          error: true,
          filename,
          errorMessage: errorMessages[0],
        }));
        uploadError = true;
        break;
      }
      if (fileSize < 4096) {
        setFileError(() => ({
          error: true,
          filename,
          errorMessage: errorMessages[1],
        }));
        uploadError = true;
        break;
      }
    }
    if (uploadError) return;
    if (files.length !== arrFiles.length) {
      const notUploadedFilesNbr = files.length - 10;
      const messageAlert =
        notUploadedFilesNbr === 1
          ? `${notUploadedFilesNbr} file is not uploaded. You can only chose 10 or fewer files.`
          : `${notUploadedFilesNbr} files are not uploaded. You can only chose 10 or fewer files.`;
      setAlertMessage(messageAlert);
    }

    const imgFilesArr: ImgFileType[] = [];
    arrFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const img = new Image();
        img.src = `${reader.result}`;
        imgFilesArr.push({ img, scale: 1, x: 0, y: 0 });
      });
      reader.readAsDataURL(file);
    });
    console.log(imgFilesArr);
    setFiles(() => imgFilesArr);
    setTimeout(() => {
      nextStep();
    }, 20);
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
              <PicVidIcon
                className={` ${styles.PicVidIcon} ${
                  dragOver && styles.changeSvgColor
                }`}
              />
              <div
                style={{
                  padding: "1rem",
                  paddingBottom: "1.5rem",
                  color: "var(--txt-c-1)",
                }}
              >
                Drag photos and videos here
              </div>
              <Button
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  padding: ".7rem 1rem",
                  letterSpacing: ".05rem",
                  borderRadius: "5px",
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
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  padding: ".7rem 1rem",
                  letterSpacing: ".05rem",
                  borderRadius: "5px",
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
