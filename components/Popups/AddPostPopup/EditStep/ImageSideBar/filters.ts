import { FiltersType } from "../..";
type FiltersMothodsType = {
  [key in FiltersType]: (pixels: ImageData, adj: number) => ImageData;
};

export function grayscale(pixels: ImageData, adj: number) {
  let d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
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

export function sepia(pixels: ImageData, adj: number) {
  let d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    let r = d[i],
      g = d[i + 1],
      b = d[i + 2];
    d[i] = r * (1 - 0.607 * adj) + g * 0.769 * adj + b * 0.189 * adj;
    d[i + 1] = r * 0.349 * adj + g * (1 - 0.314 * adj) + b * 0.168 * adj;
    d[i + 2] = r * 0.272 * adj + g * 0.534 * adj + b * (1 - 0.869 * adj);
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

export function rgbAdjust(pixels: ImageData, rgbAdj: number[]) {
  let d = pixels.data;
  for (var i = 0; i < d.length; i += 4) {
    d[i] *= rgbAdj[0];
    d[i + 1] *= rgbAdj[1];
    d[i + 2] *= rgbAdj[2];
  }
  return pixels;
}

function colorFilter(pixels: ImageData, rgbColor: number[]) {
  let d = pixels.data;
  let adj = rgbColor[3];
  for (let i = 0; i < d.length; i += 4) {
    d[i] -= (d[i] - rgbColor[0]) * adj;
    d[i + 1] -= (d[i + 1] - rgbColor[1]) * adj;
    d[i + 2] -= (d[i + 2] - rgbColor[2]) * adj;
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

const Original = (pixels: ImageData) => {
  return pixels;
};

const Clarendon = (pixels: ImageData, adj: number) => {
  pixels = brightness.apply(this, [pixels, 0.1 * adj]);
  pixels = contrast.apply(this, [pixels, 0.1 * adj]);
  pixels = saturation.apply(this, [pixels, 0.15 * adj]);
  return pixels;
};

const Gingham = (pixels: ImageData, adj: number) => {
  pixels = sepia.apply(this, [pixels, 0.04 * adj]);
  pixels = contrast.apply(this, [pixels, -0.15 * adj]);
  return pixels;
};

const Moon = (pixels: ImageData, adj: number) => {
  const grayAdj = 1 - adj;
  pixels = grayscale.apply(this, [pixels, grayAdj]);
  pixels = contrast.apply(this, [pixels, -0.14 * adj]);
  pixels = brightness.apply(this, [pixels, 0.1 * adj]);
  return pixels;
};

const Lark = (pixels: ImageData, adj: number) => {
  pixels = brightness.apply(this, [pixels, 0.08 * adj]);
  pixels = rgbAdjust.apply(this, [pixels, [1, 1 + adj * 0.03, 1 + adj * 0.05]]);
  pixels = saturation.apply(this, [pixels, 0.12 * adj]);
  return pixels;
};

const Reyes = (pixels: ImageData, adj: number) => {
  pixels = sepia.apply(this, [pixels, 0.4 * adj]);
  pixels = brightness.apply(this, [pixels, 0.13 * adj]);
  pixels = contrast.apply(this, [pixels, -0.05 * adj]);
  return pixels;
};

const Juno = (pixels: ImageData, adj: number) => {
  pixels = rgbAdjust.apply(this, [pixels, [1 + adj * 0.01, 1 + adj * 0.04, 1]]);
  pixels = saturation.apply(this, [pixels, 0.3 * adj]);
  return pixels;
};

const Slumber = (pixels: ImageData, adj: number) => {
  pixels = brightness.apply(this, [pixels, 0.1 * adj]);
  pixels = saturation.apply(this, [pixels, -0.5 * adj]);
  return pixels;
};

const Crema = (pixels: ImageData, adj: number) => {
  pixels = rgbAdjust.apply(this, [pixels, [1 + adj * 0.04, 1, 1 + adj * 0.02]]);
  pixels = saturation.apply(this, [pixels, -0.05 * adj]);
  return pixels;
};

const Ludwig = (pixels: ImageData, adj: number) => {
  pixels = brightness.apply(this, [pixels, 0.05 * adj]);
  pixels = saturation.apply(this, [pixels, -0.03 * adj]);
  return pixels;
};

const Aden = (pixels: ImageData, adj: number) => {
  pixels = colorFilter.apply(this, [pixels, [228, 130, 225, 0.13 * adj]]);
  pixels = saturation.apply(this, [pixels, -0.2 * adj]);
  return pixels;
};

const Perpetua = (pixels: ImageData, adj: number) => {
  pixels = rgbAdjust.apply(this, [pixels, [1 + adj * 0.05, 1 + adj * 0.1, 1]]);
  return pixels;
};

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
// https://github.com/girliemac/filterous-2
