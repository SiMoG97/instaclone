import { useLayoutEffect } from "react";
import { ARStateType, ImgVidFileType } from "..";
import useResizeEffect from "../../../../Hooks/useResizeEffect";
import { widthAndHeightCalc } from "../utils";

export const useImgToBgDimensions = (
  files: ImgVidFileType[],
  croppingDiv: React.RefObject<HTMLDivElement>,
  cropAreaRef: React.RefObject<HTMLDivElement>,
  videoRef: React.RefObject<HTMLVideoElement>,
  selectedFile: number,
  aspectRatio: ARStateType
) => {
  function imageToBackground() {
    if (files.length < 1 || !croppingDiv.current || !cropAreaRef.current)
      return;
    const { img } = files[selectedFile];
    const image = document.createElement("img");
    image.src = img.src;
    const imgAR = image.naturalWidth / image.naturalHeight;
    const container = cropAreaRef.current;
    const [parentW, parentH] = [container.offsetWidth, container.offsetHeight];
    const { w, h } = widthAndHeightCalc({ parentW, parentH }, imgAR);
    imgVidAndContainerDimensions(w, h);
  }
  function imgVidAndContainerDimensions(w: number, h: number) {
    if (!croppingDiv.current) return;
    croppingDiv.current.style.width = `${w}px`;
    croppingDiv.current.style.height = `${h}px`;
    if (!videoRef.current) return;
    videoRef.current.style.width = `${w}px`;
    videoRef.current.style.height = `${h}px`;
  }

  useLayoutEffect(() => {
    imageToBackground();
  }, [files, croppingDiv, selectedFile, aspectRatio]);

  useResizeEffect(imageToBackground, [
    files,
    croppingDiv,
    selectedFile,
    aspectRatio,
  ]);
};
