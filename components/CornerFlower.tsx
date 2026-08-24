import Image from "next/image";

const CORNER_CLASS = {
  tl: "corner-flower--tl",
  tr: "corner-flower--tr",
  bl: "corner-flower--bl",
  br: "corner-flower--br",
} as const;

interface Props {
  src: string;
  corner: keyof typeof CORNER_CLASS;
}

export default function CornerFlower({ src, corner }: Props) {
  return (
    <Image
      src={src}
      alt=""
      width={220}
      height={220}
      aria-hidden="true"
      className={`corner-flower ${CORNER_CLASS[corner]}`}
    />
  );
}
