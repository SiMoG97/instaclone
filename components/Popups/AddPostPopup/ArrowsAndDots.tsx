import React from "react";
import IconCircle from "./../../CommonComponents/IconCircle";
import ArrowL from "./../../../public/arrowL.svg";
import ArrowR from "./../../../public/arrowR.svg";
import { ImgFileType } from ".";
import { SliderDots } from "../../CommonComponents/SliderDots";

type ArrowsAndDotsProps = {
  selectedFile: number;
  prevFile: () => void;
  nextFile: () => void;
  files: ImgFileType[];
};

const ArrowsAndDots = ({
  nextFile,
  prevFile,
  selectedFile,
  files,
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
      {selectedFile < files.length - 1 ? (
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
      <SliderDots nbrOfDots={files.length} selectedDot={selectedFile} />
    </>
  );
};

export default ArrowsAndDots;
