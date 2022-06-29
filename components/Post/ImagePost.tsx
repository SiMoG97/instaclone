type ImagePostProps = {
  src: string;
};
export const ImagePost = ({ src }: ImagePostProps) => {
  return <img style={{ width: "100%" }} src={src} />;
};
