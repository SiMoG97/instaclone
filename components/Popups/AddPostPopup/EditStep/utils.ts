import { ARStateType } from "..";

export const CanvasWidthHeight = (ar: ARStateType, image: HTMLImageElement) => {
  if (ar === "original") {
    let imgAr = image.width / image.height;
    if (imgAr > 1.91) {
      imgAr = 1.91;
    } else if (imgAr < 0.8) {
      imgAr = 0.8;
    }
    if (imgAr > 1) {
      return {
        width: 830,
        height: 830 / imgAr,
      };
    } else if (imgAr < 1) {
      return {
        width: 830 * imgAr,
        height: 830,
      };
    }
  } else if (ar === "sixteenToNine") {
    return {
      width: 830,
      height: 830 / (16 / 9),
    };
  } else if (ar === "fourToFive") {
    return {
      width: 830 * (4 / 5),
      height: 830,
    };
  }
  return {
    width: 830,
    height: 830,
  };
};
