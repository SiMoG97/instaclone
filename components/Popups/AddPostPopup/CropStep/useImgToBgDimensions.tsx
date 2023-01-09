import { useLayoutEffect } from "react";
import { ARStateType, ImgVidFileType } from "..";
import useResizeEffect from "../../../../Hooks/useResizeEffect";

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
    let imgAR = image.naturalWidth / image.naturalHeight;
    const containerAR =
      cropAreaRef.current.offsetWidth / cropAreaRef.current.offsetHeight;
    const container = cropAreaRef.current;
    if (containerAR === 1) {
      if (imgAR === 1) {
        const [w, h] = [container.offsetWidth, container.offsetHeight];
        imgVidAndContainerDimensions(w, h);
      } else if (imgAR > 1) {
        const [w, h] = [container.offsetWidth * imgAR, container.offsetHeight];
        imgVidAndContainerDimensions(w, h);
      } else if (imgAR < 1) {
        const [w, h] = [container.offsetWidth, container.offsetWidth / imgAR];
        imgVidAndContainerDimensions(w, h);
      }
    } else if (containerAR > 1) {
      if (imgAR === 1) {
        const [w, h] = [container.offsetWidth, container.offsetWidth];
        imgVidAndContainerDimensions(w, h);
      } else if (imgAR > 1) {
        const [w, h] = [container.offsetWidth, container.offsetWidth / imgAR];
        imgVidAndContainerDimensions(w, h);
      } else if (imgAR < 1) {
        const [w, h] = [container.offsetWidth, container.offsetWidth / imgAR];
        imgVidAndContainerDimensions(w, h);
      }
    } else if (containerAR < 1) {
      if (imgAR === 1) {
        const [w, h] = [container.offsetHeight, container.offsetHeight];
        imgVidAndContainerDimensions(w, h);
      } else if (imgAR > 1) {
        const [w, h] = [container.offsetHeight * imgAR, container.offsetHeight];
        imgVidAndContainerDimensions(w, h);
      } else if (imgAR < 1) {
        let [w, h] = [container.offsetWidth, container.offsetWidth / imgAR];
        if (h < container.offsetHeight) {
          h = container.offsetHeight;
          w = h * imgAR;
        }
        imgVidAndContainerDimensions(w, h);
      }
    }
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
