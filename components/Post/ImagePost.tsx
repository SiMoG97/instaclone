type ImagePostProps = {
  src: string;
};
export const ImagePost = ({ src }: ImagePostProps) => {
  return <img style={{ minWidth: "100%" }} src={src} />;
};
