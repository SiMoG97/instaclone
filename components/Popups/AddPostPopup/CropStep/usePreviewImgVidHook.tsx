import { useLayoutEffect } from "react";
import { cordType } from ".";
import { ARStateType, ImgVidFileType } from "..";

export const usePreviewImgVid = (
  files: ImgVidFileType[],
  selectedFile: number,
  croppingDiv: React.RefObject<HTMLDivElement>,
  cropAreaRef: React.RefObject<HTMLDivElement>,
  videoRef: React.RefObject<HTMLVideoElement>,
  cords: React.MutableRefObject<cordType>,
  aspectRatio: ARStateType
) => {
  useLayoutEffect(() => {
    if (!croppingDiv.current) return;
    const { img, type, vidUrl } = files[selectedFile];
    if (type === "image") {
      croppingDiv.current.style.backgroundImage = `url("${img.src.replace(
        /(\r\n|\n|\r)/gm,
        ""
      )}")`;
    } else {
      croppingDiv.current.style.backgroundImage = "";
      if (!videoRef.current) return;
      videoRef.current.src = vidUrl;
    }
  }, [selectedFile, croppingDiv, files.length]);

  useLayoutEffect(() => {
    if (files.length === 0 || !croppingDiv.current || !cropAreaRef.current)
      return;
    const { scale, x, y } = files[selectedFile];
    croppingDiv.current.style.transform = `scale(${scale}) translate(${x}%,${y}%)`;
    window.requestAnimationFrame(() => {
      if (!croppingDiv.current || !cropAreaRef.current) return;
      const imageWidth = croppingDiv.current.offsetWidth * scale;
      const hiddenPartsWidth = imageWidth - cropAreaRef.current.offsetWidth;
      cords.current.xBorder = ((hiddenPartsWidth / 2) * 100) / imageWidth;

      const imageHeight = croppingDiv.current.offsetHeight * scale;
      const hiddenPartsHeight = imageHeight - cropAreaRef.current.offsetHeight;
      cords.current.yBorder = ((hiddenPartsHeight / 2) * 100) / imageHeight;
    });
  }, [files, croppingDiv, aspectRatio, selectedFile]);
};
