import Image from "next/image";
import { MotionDiv } from "./motion-div";
import { TechBubbles } from "./tech-bubbles";

export default function HeroBubbles() {
  return (
    <div className="flex h-[500px] w-[800px] scale-[80%] items-center justify-center rounded-xl bg-slate-800 shadow shadow-black md:scale-100">
      <MotionDiv
        className="z-50 rounded-full"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.05 }}
        drag={true}
        dragConstraints={{ left: 10, right: 10, top: 10, bottom: 10 }}
      >
        <Image
          src={"https://avatars.githubusercontent.com/u/17372417?v=5"}
          width={160}
          height={160}
          alt={"Gabriel Bianchi profile"}
          className="pointer-events-none z-50 rounded-full"
          draggable="false"
        />
        <p>asd</p>
      </MotionDiv>
      <TechBubbles />
    </div>
  );
}
