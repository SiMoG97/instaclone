export function applyMoonFilter(
  amount: number,
  // canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D | null
) {
  if (!ctx) return;
  // ctx.filter = "grayscale(150%) brightness(180%) contrast(70%)";
  // ctx.filter = "grayscale(150%) brightness(180%) contrast(70%)";
  ctx.filter = `brightness(${100 + amount}%)`;
  console.log(ctx);
  // console.log("hmmmm");
  // const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  // const data = imageData.data;
  // const newPixels = moonFilter(imageData);

  // for (let i = 0; i < data.length; i += 4) {
  //   const r = data[i];
  //   const g = data[i + 1];
  //   const b = data[i + 2];
  //   const a = data[i + 3];

  //   // Modify the pixel values to apply the black and white filter effect
  //   let nbr = 3 / 3;
  //   const gray = (r + g + b) / 2.3;
  //   data[i] = gray;
  //   data[i + 1] = gray;
  //   data[i + 2] = gray;
  //   data[i + 3] = a;
  // }

  // for (let i = 0; i < data.length; i += 4) {
  //   // Extract the red, green, and blue values for the current pixel
  //   // const r = data[i];
  //   // const g = data[i + 1];
  //   // const b = data[i + 2];
  //   // // Calculate the average value of the RGB channels
  //   // const avg = (r + g + b) / 3;
  //   // // Set the red, green, and blue values of the current pixel to the average value, creating a grayscale effect
  //   // data[i] = avg;
  //   // data[i + 1] = avg;
  //   // data[i + 2] = avg;
  //   // // Increase the contrast of the pixel by the specified amount
  //   // data[i] = data[i] + (data[i] - 128) * (amount / 100);
  //   // data[i + 1] = data[i + 1] + (data[i + 1] - 128) * (amount / 100);
  //   // data[i + 2] = data[i + 2] + (data[i + 2] - 128) * (amount / 100);
  //   // const r = data[i];
  //   // const g = data[i + 1];
  //   // const b = data[i + 2];
  //   // const a = data[i + 3];
  //   // // Modify the pixel values to apply the moon filter effect
  //   // data[i] = (r + g + b) / 3;
  //   // data[i + 1] = (r + g + b) / 3;
  //   // data[i + 2] = (r + g + b) / 3;
  //   // data[i + 3] = a;
  // }

  // Update the canvas with the modified image data
  // ctx.putImageData(imageData, 0, 0);
  // ctx.putImageData(newPixels, 0, 0);
}

// type adjType = [ImageData, number];

export const grayscale = (pixels: ImageData) => {
  let d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    let r = d[i],
      g = d[i + 1],
      b = d[i + 2];

    let wa = 0.7;
    // let wa = 0.2126;
    let jo = 0.7152;
    let tla = 0.0722;
    // let tla = 0.02;
    let avg = wa * r + jo * g + tla * b;
    // let avg = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    // avg = avg * 0;
    d[i] = d[i + 1] = d[i + 2] = avg;
  }

  return pixels;
};
export const contrast = (pixels: ImageData, adj: number) => {
  // if()
  adj *= 255;
  let d = pixels.data;
  let factor = (259 * (adj + 255)) / (255 * (259 - adj));
  for (let i = 0; i < d.length; i += 4) {
    d[i] = factor * (d[i] - 128) + 128;
    d[i + 1] = factor * (d[i + 1] - 128) + 128;
    d[i + 2] = factor * (d[i + 2] - 128) + 128;
  }
  return pixels;
};
export const brightness = (pixels: ImageData, adj: number) => {
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
};

// Filters
export const moonFilter = (pixels: ImageData) => {
  pixels = grayscale.apply(this, [pixels]);
  pixels = contrast.apply(this, [pixels, -0.14]);
  pixels = brightness.apply(this, [pixels, 0.1]);
  return pixels;
};
// const willow = (pixels: ImageData) => {
//   pixels = grayscale.apply(this, [pixels, 1]);
//   pixels = colorFilter.apply(this, [pixels, [100, 28, 210, 0.03]]);
//   pixels = brightness.apply(this, [pixels, 0.1]);
//   return pixels;
// };
