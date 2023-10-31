"use client";
import { Icon } from "@iconify/react";
import { motion, useAnimationControls } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

const LOGOS = [
  { className: "logos:react", href: "https://react.dev/" },
  { className: "devicon:trpc", href: "https://trpc.io/" },
  { className: "cib:next-js", href: "https://nextjs.org/" },
  { className: "logos:tailwindcss-icon", href: "https://tailwindcss.com/" },
  {
    className: "logos:typescript-icon",
    href: "https://www.typescriptlang.org/",
  },
  { className: "skill-icons:prisma", href: "https://www.prisma.io/" },
] as const;

const logoAngle = (360 / LOGOS.length) * (Math.PI / 180);

export function TechBubbles() {
  return LOGOS.map((logo, i) => (
    <Bubble key={logo.href} angle={i * logoAngle} initialDelay={i * 0.25}>
      <Link href={logo.href} draggable={false} target="_blank">
        <Icon icon={logo.className} width={80} height={80} />
      </Link>
    </Bubble>
  ));
}

function Bubble({
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
