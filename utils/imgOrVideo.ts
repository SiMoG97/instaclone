function getExtension(fileName: string) {
  const parts = fileName.split(".");
  return parts[parts.length - 1];
}

function imgOrVideo(src: string) {
  const ext = getExtension(src);
  if (ext === "jpeg" || ext === "jpg" || ext === "png") {
    return "img";
  }
  return "vid";
}
export default imgOrVideo;
