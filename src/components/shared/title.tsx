import Image from "next/image";
import imgPath from "../../../public/images/icon_image.png";

const Title = ({ text }: { text: string }) => {
  return (
    <div className="text-lg md:text-2xl font-medium py-5 flex items-center justify-center flex-col gap-3">
      <h4 className="text-[var(--primary-color)]">{text}</h4>
      <Image src={imgPath} alt="icon" />
    </div>
  );
};

export default Title;
