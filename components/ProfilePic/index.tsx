import Image from "next/image";

type props = {
  src: string;
  width: number;
  height: number;
};
const ProfilePic = ({ src, width, height }: props) => {
  return (
    <div className="profilePic">
      <Image src={src} width={width} height={height} />
    </div>
  );
};

export default ProfilePic;
