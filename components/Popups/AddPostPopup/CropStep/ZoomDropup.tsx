import React, { useEffect } from "react";
import RangeSlide from "../../../FormComponents/RangeSlide";
import MagnidyingGlass from "../../../../public/magnifyingGlass.svg";

import { IconPopup } from "../IconPopup";
import { ImgFileType } from "..";

type ZoomDropupProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  files: ImgFileType[];
  // selectedFile: ImgFileType;
  selectedFile: number;
  element: React.RefObject<HTMLDivElement>;
  setFiles: React.Dispatch<React.SetStateAction<ImgFileType[]>>;
};

const ZoomDropup = ({
  isOpen,
  setIsOpen,
  files,
  selectedFile,
  element,
  setFiles,
}: ZoomDropupProps) => {
  function updateScaleValue() {
    if (!element.current || files.length === 0) return;
    const scale =
      element.current.getBoundingClientRect().width /
      element.current.offsetWidth;
    const newState = files.map((file, i) => {
      if (selectedFile === i) {
        return { ...file, scale };
      }
      return file;
    });
    setFiles(() => newState);
  }
  useEffect(() => {
    if (!isOpen) {
      updateScaleValue();
    }
  }, [isOpen]);
  function scaleHandler(scaleValue: number) {
    const scale = 1 + scaleValue / 100;
    if (element.current) {
      // element.current.style.transform = `scale(${scale}) translate(${selectedFile.x}%,${selectedFile.y}%)`;
      element.current.style.transform = `scale(${scale}) translate(${files[selectedFile].x}%,${files[selectedFile].y}%)`;
    }
  }
  return (
    <IconPopup
      someDropOpen={isOpen}
      setSomeDropOpen={setIsOpen}
      Icon={MagnidyingGlass}
      style={{ left: "8rem", zIndex: "1" }}
      callback={updateScaleValue}
      dropUpStyle={{
        width: "13.2rem",
        display: "flex",
        alignItems: "center",
        padding: "1.5rem 1rem",
        borderRadius: ".8rem",
        left: "8rem",
        bottom: "6rem",
      }}
      DropUp={
        <RangeSlide
          startFrom="left"
          changeHandler={scaleHandler}
          lineColor="#000000"
          thumbColor="#ffffff"
          thumbSize="1.7rem"
          setedValue={
            files.length > 0 ? (files[selectedFile].scale - 1) * 100 : 0
          }
        />
      }
    />
  );
};

export default ZoomDropup;
