import Image from "next/image";
import { MotionDiv } from "./motion-div";
import { TechBubbles } from "./tech-bubbles";

export default function HeroBubbles() {
  return (
    <div className="flex h-[450px] w-[600px] scale-[80%] flex-col items-center justify-center rounded-xl bg-slate-800 shadow shadow-black md:w-[800px] md:scale-100">
      <MotionDiv
        className="z-50 rounded-full text-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.05 }}
        drag={true}
        dragSnapToOrigin
      >
        <Image
          src={"https://avatars.githubusercontent.com/u/17372417?v=5"}
          width={160}
          height={160}
          alt={"Gabriel Bianchi's profile picture"}
          className="pointer-events-none z-50 rounded-full"
          draggable="false"
        />
      </MotionDiv>
      <TechBubbles />
      <h1 className="font-bold">Gabriel Bianchi</h1>
    </div>
  );
}
