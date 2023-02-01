import { FiltersType } from "../..";
type FiltersMothodsType = {
  [key in FiltersType]: (pixels: ImageData, adj: number) => ImageData;
};
export function grayscale(pixels: ImageData, adj: number) {
  let d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    // let r = d[i],
    //   g = d[i + 1],
    //   b = d[i + 2];
    // let avg = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    // d[i] = d[i + 1] = d[i + 2] = avg;

    const avg = (d[i] + d[i + 1] + d[i + 2]) / 3;
    d[i] = avg * (1 - adj) + d[i] * adj;
    d[i + 1] = avg * (1 - adj) + d[i + 1] * adj;
    d[i + 2] = avg * (1 - adj) + d[i + 2] * adj;
  }
  return pixels;
}
export function brightness(pixels: ImageData, adj: number) {
  let d = pixels.data;
  adj = adj > 1 ? 1 : adj;
  adj = adj < -1 ? -1 : adj;
  adj = ~~(255 * adj);

  for (let i = 0; i < d.length; i += 4) {
    d[i] += adj;
    d[i + 1] += adj;
    d[i + 2] += adj;
  }
  return pixels;
}
export function contrast(pixels: ImageData, adj: number) {
  adj *= 255;
  let d = pixels.data;
  let factor = (259 * (adj + 255)) / (255 * (259 - adj));
  for (let i = 0; i < d.length; i += 4) {
    d[i] = factor * (d[i] - 128) + 128;
    d[i + 1] = factor * (d[i + 1] - 128) + 128;
    d[i + 2] = factor * (d[i + 2] - 128) + 128;
  }
  return pixels;
}
export function saturation(pixels: ImageData, adj: number) {
  let d = pixels.data;
  adj = adj < -1 ? -1 : adj;
  for (let i = 0; i < d.length; i += 4) {
    let r = d[i],
      g = d[i + 1],
      b = d[i + 2];
    let gray = 0.2989 * r + 0.587 * g + 0.114 * b; //weights from CCIR 601 spec
    d[i] = -gray * adj + d[i] * (1 + adj);
    d[i + 1] = -gray * adj + d[i + 1] * (1 + adj);
    d[i + 2] = -gray * adj + d[i + 2] * (1 + adj);
  }
  return pixels;
}
export function temperature(pixels: ImageData, adj: number) {
  let d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i] += (255 - d[i]) * adj;
    d[i + 1] -= (d[i + 1] * adj) / 2;
    d[i + 2] -= d[i + 2] * adj;
  }
  return pixels;
}
export function fade(pixels: ImageData, adj: number) {
  let d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i + 3] = d[i + 3] * (1 - adj);
  }
  return pixels;
}
export function vignette(pixels: ImageData, adj: number, c: HTMLCanvasElement) {
  let d = pixels.data;
  const w = c.width;
  const h = c.height;
  const centerX = c.width / 2;
  const centerY = c.height / 2;

  for (let i = 0; i < d.length; i += 4) {
    const x = (i / 4) % w;
    const y = Math.floor(i / 4 / w);

    const distance = Math.sqrt(
      Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
    );
    const vignette = 1 - adj * (distance / 2 / Math.max(w, h));
    d[i] *= vignette;
    d[i + 1] *= vignette;
    d[i + 2] *= vignette;
  }
  return pixels;
}
// Filters
// const willow = (pixels: ImageData) => {
//   pixels = grayscale.apply(this, [pixels, 1]);
//   pixels = colorFilter.apply(this, [pixels, [100, 28, 210, 0.03]]);
//   pixels = brightness.apply(this, [pixels, 0.1]);
//   return pixels;
// };
function Original(pixels: ImageData) {
  console.log("Original");
  return pixels;
}
function Clarendon(pixels: ImageData) {
  console.log("Clarendon");
  return pixels;
}
function Gingham(pixels: ImageData) {
  console.log("Gingham");
  return pixels;
}
const Moon = (pixels: ImageData, adj: number) => {
  const grayAdj = 1 - adj;
  console.log(adj);
  pixels = grayscale.apply(this, [pixels, grayAdj]);
  pixels = contrast.apply(this, [pixels, -0.14 * adj]);
  pixels = brightness.apply(this, [pixels, 0.1 * adj]);
  return pixels;
};
function Lark(pixels: ImageData) {
  console.log("Lark");
  return pixels;
}
function Reyes(pixels: ImageData) {
  console.log("Reyes");
  return pixels;
}
function Juno(pixels: ImageData) {
  console.log("Juno");
  return pixels;
}
function Slumber(pixels: ImageData) {
  console.log("Slumber");
  return pixels;
}
function Crema(pixels: ImageData) {
  console.log("Crema");
  return pixels;
}
function Ludwig(pixels: ImageData) {
  console.log("Ludwig");
  return pixels;
}
function Aden(pixels: ImageData) {
  console.log("Aden");
  return pixels;
}
function Perpetua(pixels: ImageData) {
  console.log("Perpetua");
  return pixels;
}

export const filters: FiltersMothodsType = {
  Original,
  Clarendon,
  Gingham,
  Moon,
  Lark,
  Reyes,
  Juno,
  Slumber,
  Crema,
  Ludwig,
  Aden,
  Perpetua,
};
