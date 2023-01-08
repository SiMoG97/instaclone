import styles from "../../popup.module.scss";
import PicVidIcon from "../../../../public/picVideoImp.svg";
import ExclamIcon from "../../../../public/exclamation.svg";
import Button from "./../../../Button";
import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FileInput } from "../../../FormComponents/FileInput";
import FileExtChecker from "../../../../utils/FileExtChecker";
import { ImgVidFileType } from "..";
import { newFileConstructor } from "./newFileConstructor";
import { pushVidToState } from "./pushVidToState";
import { pushImgToState } from "./pushImgToState";

type ImportImgStepProps = {
  files: ImgVidFileType[];
  setFiles: Dispatch<SetStateAction<ImgVidFileType[]>>;
  nextStep: () => void;
  setAlertMessage: Dispatch<SetStateAction<string>>;
  setSelectedFile: React.Dispatch<React.SetStateAction<number>>;
  // setSelectedFile: React.Dispatch<React.SetStateAction<ImgFileType>>;
  selectedFileIdRef: React.MutableRefObject<string>;
};

export function ImportImgStep({
  files,
  setFiles,
  nextStep,
  setAlertMessage,
  setSelectedFile,
  selectedFileIdRef,
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
      {
        title: "Files must be 100 MB or less.",
        message:
          " is too large. To continue, choose a file that's 100 MB or less.",
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
  function validteFiles(importedFiles: FileList) {
    let arrFiles = Object.keys(importedFiles)
      .map((obj: any) => importedFiles[obj])
      .slice(0, 10);
    console.log(arrFiles);
    let uploadError = false;
    for (const file of arrFiles) {
      const fileSize = file.size;
      const filename = file.name;
      const { fileType, isFileAllowed } = FileExtChecker(filename);
      if (!isFileAllowed) {
        setFileError(() => ({
          error: true,
          filename,
          errorMessage: errorMessages[0],
        }));
        uploadError = true;
        break;
      }
      if (fileType === "image" && fileSize < 4096) {
        setFileError(() => ({
          error: true,
          filename,
          errorMessage: errorMessages[1],
        }));
        uploadError = true;
        break;
      }
      if (fileType === "video" && fileSize > 100000000) {
        setFileError(() => ({
          error: true,
          filename,
          errorMessage: errorMessages[2],
        }));
        uploadError = true;
        break;
      }
    }
    if (uploadError) return;
    if (importedFiles.length !== arrFiles.length) {
      const notUploadedFilesNbr = importedFiles.length - 10;
      const messageAlert =
        notUploadedFilesNbr === 1
          ? `${notUploadedFilesNbr} file is not uploaded. You can only chose 10 or fewer files.`
          : `${notUploadedFilesNbr} files are not uploaded. You can only chose 10 or fewer files.`;
      setAlertMessage(messageAlert);
    }

    // const imgFilesArr: ImgFileType[] = [];
    // let firstFiles: ImgFileType;
    arrFiles.forEach((file: File, i: number, thisArr) => {
      const { fileType } = FileExtChecker(file.name);
      if (fileType === "image") {
        pushImgToState({ file, setFiles, i, selectedFileIdRef }, () => {
          goToNextStep(thisArr.length, i);
        });
      } else {
        pushVidToState({ file, setFiles, i, selectedFileIdRef }, () => {
          goToNextStep(thisArr.length, i);
        });
      }
    });
  }
  function goToNextStep(nbrFiles: number, index: number) {
    if (index < nbrFiles - 1) return;
    nextStep();
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

type pushImgToStateType = {
  file: File;
  selectedFileIdRef?: React.MutableRefObject<string>;
  setFiles: React.Dispatch<React.SetStateAction<ImgVidFileType[]>>;
  i?: number;
};
