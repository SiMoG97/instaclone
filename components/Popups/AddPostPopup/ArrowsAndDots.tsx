import React from "react";
import IconCircle from "./../../CommonComponents/IconCircle";
import ArrowL from "./../../../public/arrowL.svg";
import ArrowR from "./../../../public/arrowR.svg";
import { ImgVidFileType } from ".";
import { SliderDots } from "../../CommonComponents/SliderDots";

type ArrowsAndDotsProps = {
  selectedFile: number;
  prevFile: () => void;
  nextFile: () => void;
  filesLength: number;
};

const ArrowsAndDots = ({
  nextFile,
  prevFile,
  selectedFile,
  filesLength,
}: ArrowsAndDotsProps) => {
  return (
    <>
      {selectedFile > 0 ? (
        <div
          style={{
            position: "absolute",
            left: ".8rem",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onClick={prevFile}
        >
          <IconCircle Icon={ArrowL} />
        </div>
      ) : null}
      {selectedFile < filesLength - 1 ? (
        <div
          style={{
            position: "absolute",
            right: ".8rem",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onClick={nextFile}
        >
          <IconCircle Icon={ArrowR} />
        </div>
      ) : null}
      <SliderDots nbrOfDots={filesLength} selectedDot={selectedFile} />
    </>
  );
};

export default ArrowsAndDots;
