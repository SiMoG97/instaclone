import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PopupBody from "../PopupBody";
import PopupContainer, { SetIsOpenType } from "../PopupContainer";
import { CropStep } from "./CropStep";
import { EditStep } from "./EditStep";
import { ImportImgStep } from "./ImportFileStep";
import { SharePostStep } from "./SharePostStep";
import { NextPrevStepHeader } from "./NextPrevStepHeader";
import styles from "../popup.module.scss";
import SmallPopup from "../SmallPopup";
import AddPost from "../../../public/addPost.svg";
import AddPostActive from "../../../public/addPostActive.svg";
import SidebarContainer from "./SidebarContainer";
import EditSidebar from "./EditStep/EditSideBar";
import { exportImage } from "./EditStep/ImagePreview/DrawingImageFunctions";
import { dataUrlToBlob } from "./utils";
import { CanvasWidthHeight } from "./EditStep/utils";
// import { filtersRefT } from "./EditStep/ImageSideBar/EditImage";

export type filter = {
  name: string;
  value: number;
};
export type filtersRefT = { postId: string; filters: filter[] }[];
export type ImgVidFileType = {
  type: "video" | "image";
  img: HTMLImageElement;
  scale: number;
  x: number;
  y: number;
  id: string;
  filter: FiltersType;
  adjustSettings: {
    brightness: number;
    contrast: number;
    saturation: number;
    temperature: number;
    fade: number;
    vignette: number;
  };
  vidUrl: string;
  startsAt: number;
  endsAt: number;
  duration: number;
  coverTime: number;
  sound: boolean;
};

type AddPostPopupType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type FiltersType =
  | "Original"
  | "Clarendon"
  | "Gingham"
  | "Moon"
  | "Lark"
  | "Reyes"
  | "Juno"
  | "Slumber"
  | "Crema"
  | "Ludwig"
  | "Aden"
  | "Perpetua";

export type ARStateType =
  | "original"
  | "oneToOne"
  | "fourToFive"
  | "sixteenToNine";

type ImgToUp = {
  id: string;
  type: "image";
  src: string;
};

export type VidToUp = {
  id: string;
  type: "video";
  img: HTMLImageElement;
  vidUrl: string;
  startsAt: number;
  endsAt: number;
  duration: number;
  coverTime: number;
  sound: boolean;
  x: number;
  y: number;
  src: string;
};
export type FilesToUploadT = (ImgToUp | VidToUp)[];
const headers = ["Create new post", "Crop", "Edit", "Create new post"];

function AddPostPopup({ isOpen, setIsOpen }: AddPostPopupType) {
  const [aspectRatio, setAspectRatio] = useState<ARStateType>("oneToOne");
  const filtersRef = useRef<filtersRefT | undefined>();

  const initDiscardBtns = [
    {
      text: "Discard",
      method: () => {
        setStep(() => 0);
        setFiles(() => []);
        setSelectedFile(0);
        setShowDiscardPopup(() => false);
      },
      danger: true,
    },
    {
      text: "Cancel",
      method: () => {
        setShowDiscardPopup(() => false);
      },
    },
  ];
  const [step, setStep] = useState(0);
  const prevStepRef = useRef(0);
  const [files, setFiles] = useState<ImgVidFileType[]>([] as ImgVidFileType[]);
  const [selectedFile, setSelectedFile] = useState(0);
  const [showDiscardPopup, setShowDiscardPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const alertDiv = useRef<HTMLDivElement>(null);
  const croppingDiv = useRef<HTMLDivElement>(null);
  const selectedFileIdRef = useRef<string>("");

  const [discardPopupButtons, setDiscardPopupButtons] =
    useState(initDiscardBtns);

  useEffect(() => {
    if (!isOpen) {
      setDiscardPopupButtons(initDiscardBtns);
    }
  }, [isOpen]);

  const nextStep = useCallback(() => {
    setStep((prev) => {
      if (prev === headers.length - 1) {
        prevStepRef.current = headers.length - 2;
        return headers.length - 1;
      }
      prevStepRef.current = prev;
      prev++;
      return prev;
    });
  }, [headers.length, step]);

  const prevStep = () => {
    setStep((prev) => {
      if (prev === 0) {
        prevStepRef.current = 0;
        return prev;
      }
      prevStepRef.current = prev;
      prev--;
      return prev;
    });
  };

  function nextFile() {
    setSelectedFile((i) => {
      if (i >= files.length - 1) {
        return i;
      }
      i++;
      return i;
    });
  }
  function prevFile() {
    setSelectedFile((i) => {
      if (i <= 0) {
        return 0;
      }
      i--;
      return i;
    });
  }
  useEffect(() => {
    if (!files[selectedFile]) return;
    selectedFileIdRef.current = files[selectedFile].id;
  }, [selectedFile]);

  useEffect(() => {
    setTimeout(() => {
      if (alertDiv.current) {
        alertDiv.current.style.opacity = "0";
      }
    }, 2000);
  }, [alertMessage]);

  const PopupContainerCallback = () => {
    if (step !== 0) {
      const btns = discardPopupButtons;
      btns[0].method = () => {
        setStep(() => 0);
        setFiles(() => []);
        setShowDiscardPopup(() => false);
        setIsOpen(() => false);
      };
      setDiscardPopupButtons(() => btns);
      setShowDiscardPopup(() => true);
      return;
    }
    setIsOpen(() => false);
  };
  //////////
  const filesToUp = useHandleFilesToUpload(
    files,
    filtersRef,
    step,
    aspectRatio
  );

  return (
    <>
      <PopupContainer
        isXout={true}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        callback={PopupContainerCallback}
      >
        <PopupBody
          isXin={false}
          popupHeader={
            <NextPrevStepHeader
              prevStep={prevStep}
              nextStep={nextStep}
              setShowDiscardPopup={setShowDiscardPopup}
              headerTitle={headers[step]}
              step={step}
              setIsOpen={setIsOpen}
            />
          }
          setIsOpen={setIsOpen}
          className={styles.postStepsBody}
        >
          <>
            <div
              className={styles.previewAndSidebarContainer}
              style={{ transition: "2s", display: "flex" }}
            >
              {step === 0 ? (
                <ImportImgStep
                  files={files}
                  setFiles={setFiles}
                  nextStep={nextStep}
                  setAlertMessage={setAlertMessage}
                  setSelectedFile={setSelectedFile}
                  selectedFileIdRef={selectedFileIdRef}
                />
              ) : null}
              {step === 1 ? (
                <CropStep
                  prevStep={prevStepRef.current}
                  files={files}
                  setFiles={setFiles}
                  nextFile={nextFile}
                  prevFile={prevFile}
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  selectedFileIdRef={selectedFileIdRef}
                  setStep={setStep}
                  setAlertMessage={setAlertMessage}
                  aspectRatio={aspectRatio}
                  setAspectRatio={setAspectRatio}
                />
              ) : null}
              {step === 2 ? (
                <>
                  <EditStep
                    prevStep={prevStepRef.current}
                    files={files}
                    setFiles={setFiles}
                    nextFile={nextFile}
                    prevFile={prevFile}
                    aspectRatio={aspectRatio}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                    step={step}
                    filtersRef={filtersRef}
                  />
                </>
              ) : null}
              {step === 3 ? (
                <SharePostStep
                  step={step}
                  prevFile={prevFile}
                  nextFile={nextFile}
                  selectedFile={selectedFile}
                  aspectRatio={aspectRatio}
                  filesToUp={filesToUp}
                />
              ) : null}
            </div>
            {alertMessage ? (
              <div ref={alertDiv} className={styles.alertMessage}>
                {alertMessage}
              </div>
            ) : null}
          </>
        </PopupBody>
      </PopupContainer>
      {showDiscardPopup ? (
        <SmallPopup
          titleOrPic="Discard post?"
          text="If you leave, your edits won't be saved."
          buttonList={discardPopupButtons}
          popupCloser={setShowDiscardPopup}
        />
      ) : null}
    </>
  );
}

export default AddPostPopup;

export const originalArCalcul = (width: number, height: number) => {
  let ar = width / height;
  if (ar === 1) {
    return {
      width: "100%",
      height: "100%",
    };
  }
  if (ar > 1.91) {
    ar = 1.91;
  } else if (ar < 0.8) {
    ar = 0.8;
  }
  if (ar > 1) {
    return {
      width: "100%",
      height: `calc(100% / ${ar})`,
    };
  } else if (ar < 1) {
    return {
      // width: `calc(${width}px * ${ar})`,
      width: `calc(100% * ${ar})`,
      height: "100%",
    };
  } else {
    return {
      width: "auto",
      height: "auto",
    };
  }
};

function useHandleFilesToUpload(
  files: ImgVidFileType[],
  filtersRef: React.MutableRefObject<filtersRefT | undefined>,
  step: number,
  aspectRatio: ARStateType
) {
  const [filesToUp, setFilesToUp] = useState<FilesToUploadT>(
    [] as FilesToUploadT
  );
  useEffect(() => {
    if (step < 2) {
      filtersRef.current = undefined;
    } else if (step === 3) {
      (async () => {
        const newFilesToUp: FilesToUploadT = [];
        for (let i = 0; i < files.length; i++) {
          if (!filtersRef.current) continue;
          if (files[i].type === "video") {
            const vidFile: VidToUp = {
              id: files[i].id,
              type: "video",
              img: files[i].img,
              vidUrl: files[i].vidUrl,
              startsAt: files[i].startsAt,
              endsAt: files[i].endsAt,
              coverTime: files[i].coverTime,
              duration: files[i].duration,
              sound: files[i].sound,
              x: files[i].x,
              y: files[i].y,
              src: files[i].img.src,
            };
            newFilesToUp.push(vidFile);
          } else {
            if (files[i].id !== filtersRef.current[i].postId) continue;
            let filterAndValue = filtersRef.current[i].filters.find(
              ({ name }) => name === files[i].filter
            );
            let value = 100;
            if (filterAndValue) {
              value = filterAndValue.value;
            }
            const data = exportImage(
              CanvasWidthHeight(aspectRatio, files[0].img),
              files[i],
              value
            );
            if (!data) {
              newFilesToUp.push({
                id: files[i].id,
                type: "image",
                src: "",
              } as ImgToUp);
              continue;
            }
            const imgBlob = await dataUrlToBlob(data);
            newFilesToUp.push({
              id: files[i].id,
              type: "image",
              src: imgBlob,
            } as ImgToUp);
          }
        }
        setFilesToUp(() => newFilesToUp);
      })();
    }
  }, [step]);
  return filesToUp;
}
