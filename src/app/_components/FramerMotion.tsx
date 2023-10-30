"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

const LOGOS = [
  "logos:react",
  "devicon:trpc",
  "cib:next-js",
  "logos:tailwindcss-icon",
  "logos:typescript-icon",
  "skill-icons:prisma",
];

export default function HeroBubbles() {
  const numLogos = LOGOS.length;
  const logoAngle = (360 / numLogos) * (Math.PI / 180);

  return (
    <div className="flex h-[500px] w-[800px] scale-75 items-center justify-center rounded-xl bg-slate-800 shadow shadow-black md:scale-100">
      <motion.div
        className="z-50 rounded-full"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1.1 }}
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
      </motion.div>
      {LOGOS.map((logo, i) => (
        <Ball key={logo + i} angle={i * logoAngle} initialDelay={i * 0.25}>
          <Icon icon={logo ?? ""} width={80} height={80} />
        </Ball>
      ))}
    </div>
  );
}

function Ball({
  children,
  initialDelay = 0,
  angle = 0,
}: {
  children: React.ReactNode;
  initialDelay?: number;
  angle?: number;
}) {
  const RADIUS = 240;
  const controls = useAnimationControls();

  // Calculate x and y positions using trigonometry
  const x = RADIUS * Math.cos(angle);
  const y = RADIUS * Math.sin(angle);

  // Define a function to move the ball slightly
  const floatingDuration = Math.random() * 2 + 1; // Randomize duration
  const floatingAmplitude = 16; // Randomize amplitude

  useEffect(() => {
    const initialAnimation = async () => {
      await controls.start({
        x,
        y,
        transition: { duration: 2, type: "spring", delay: initialDelay },
      });
      void hoverEffect();
    };
    const hoverEffect = async () => {
      while (true) {
        await controls.start({
          x: x + (Math.random() * floatingAmplitude - floatingAmplitude / 2),
          y: y + (Math.random() * floatingAmplitude - floatingAmplitude / 2),
          rotate: Math.random() * 10 - 5, // Add a random rotation
          transition: { duration: floatingDuration },
        });
        await controls.start({
          x,
          y,
          rotate: 0, // Reset rotation
          transition: { duration: floatingDuration },
        });
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    };
    void initialAnimation();
    return () => {
      controls.stop();
    };
  }, [controls, floatingDuration, initialDelay, x, y]);

  return (
    <motion.div
      className="absolute flex h-36 w-36 items-center justify-center rounded-full border bg-slate-700"
      whileHover={{ scale: 1.2, opacity: 0.9 }}
      whileTap={{ scale: 1.1 }}
      animate={{ ...controls }}
      drag={true}
      onDrag={() => controls.stop()}
      dragConstraints={{
        left: x + 10,
        right: x + 10,
        top: y + 10,
        bottom: y + 10,
      }}
      initial={{ opacity: 0.8 }} // Set initial opacity to 0.5
    >
      {children}
    </motion.div>
  );
}
