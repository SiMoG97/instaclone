const FileExtChecker = (fileName: string) => {
  const extensions = [
    "jpeg",
    "jpg",
    "png",
    "jfif",
    "heic",
    "heif",
    "mp4",
    "quicktime",
  ];

  function getExtension(fileName: string) {
    const parts = fileName.split(".");
    return parts[parts.length - 1];
  }
  const ext = getExtension(fileName);
  const idx = extensions.indexOf(ext.toLowerCase());
  if (idx === -1) {
    return false;
  }
  return true;
};

export default FileExtChecker;
