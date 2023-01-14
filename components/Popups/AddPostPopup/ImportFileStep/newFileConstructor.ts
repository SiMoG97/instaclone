import { ImgVidFileType } from "..";
import { v4 as uuidv4 } from "uuid";

type FileConstructorType = {
  type: "image" | "video";
  img?: HTMLImageElement;
  vidUrl?: string;
  startsAt?: number;
  endsAt?: number;
};

export const newFileConstructor = ({
  type,
  img = new Image(),
  vidUrl = "",
  startsAt = 0,
  endsAt = 0,
}: FileConstructorType) => {
  const newFile: ImgVidFileType = {
    type,
    img,
    scale: 1,
    x: 0,
    y: 0,
    id: uuidv4(),
    filter: "Original",
    adjustSettings: {
      brightness: 0,
      contrast: 0,
      saturation: 0,
      temperature: 0,
      fade: 0,
      vignette: 0,
    },
    vidUrl,
    startsAt,
    endsAt,
    duration: endsAt,
  };
  return newFile;
};
