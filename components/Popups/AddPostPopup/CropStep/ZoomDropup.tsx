import React, { useEffect, useState } from "react";
import RangeSlide from "../../../FormComponents/RangeSlide";
import MagnidyingGlass from "../../../../public/magnifyingGlass.svg";

import { IconPopup } from "../IconPopup";
import { ImgVidFileType } from "..";

type ZoomDropupProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  files: ImgVidFileType[];
  selectedFile: number;
  element: React.RefObject<HTMLDivElement>;
  setFiles: React.Dispatch<React.SetStateAction<ImgVidFileType[]>>;
};

const ZoomDropup = ({
  isOpen,
  setIsOpen,
  files,
  selectedFile,
  element,
  setFiles,
}: ZoomDropupProps) => {
  const [active, setActive] = useState(false);
  function updateScaleValue() {
    if (!element.current || files.length === 0) return;
    const scale =
      element.current.getBoundingClientRect().width /
      element.current.offsetWidth;
    const newState = files.map((file, i) => {
      if (selectedFile === i) {
        console.log("hmmm");
        return { ...file, scale };
      }
      return file;
    });
    setFiles(() => newState);
  }
  useEffect(() => {
    if (!element.current || !active) return;
    element.current.style.transition = "none";
  }, [active]);

  function scaleHandler(scaleValue: number) {
    if (!element.current) return;
    const scale = 1 + scaleValue / 100;
    element.current.style.transform = `scale(${scale}) translate(${files[selectedFile].x}%,${files[selectedFile].y}%)`;
  }
  return (
    <IconPopup
      active={active}
      setActive={setActive}
      someDropOpen={isOpen}
      setSomeDropOpen={setIsOpen}
      Icon={MagnidyingGlass}
      style={{ left: "8rem", zIndex: "1" }}
      callback={updateScaleValue}
      dropUpStyle={dropUpStyle}
      DropUp={
        <RangeSlide
          startFrom="left"
          changeHandler={scaleHandler}
          lineColor="#000000"
          thumbColor="#ffffff"
          thumbSize="1.7rem"
          pointerUp={updateScaleValue}
          setedValue={
            files.length > 0 ? (files[selectedFile].scale - 1) * 100 : 0
          }
        />
      }
    />
  );
};
const dropUpStyle = {
  width: "13.2rem",
  display: "flex",
  alignItems: "center",
  padding: "1.5rem 1rem",
  borderRadius: ".8rem",
  left: "8rem",
  bottom: "6rem",
};

export default ZoomDropup;
