import Image from "next/image";

type props = {
  src: string;
  width: number;
  height: number;
  className?: string;
};

const ProfilePic = ({ src, width, height, className = "" }: props) => {
  return (
    <div
      className={`profilePic ${className}`}
      style={{ width: width / 10 + "rem", height: height / 10 + "rem" }}
    >
      <Image src={src} width={width} height={height} />
    </div>
  );
};

export default ProfilePic;
