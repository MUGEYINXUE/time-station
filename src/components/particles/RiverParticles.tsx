"use client";

import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export default function RiverParticles() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="river-particles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        fpsLimit: 60,
        particles: {
          number: {
            value: 80,
            density: { enable: true, factor: 900 },
          },
          color: {
            value: ["#4ecdc4", "#35b8b0", "#6dd4c8", "#ffd93d"],
          },
          shape: { type: "circle" },
          opacity: {
            value: { min: 0.1, max: 0.4 },
            animation: {
              enable: true,
              speed: 0.5,
              sync: false,
            },
          },
          size: {
            value: { min: 1, max: 4 },
            animation: {
              enable: true,
              speed: 1,
              sync: false,
            },
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "right",
            random: false,
            straight: false,
            outModes: { default: "out" },
            angle: { value: 10, offset: 5 },
            path: {
              enable: true,
              options: {
                size: 10,
                draw: false,
                delay: { value: 0 },
              },
            },
          },
          links: {
            enable: true,
            distance: 150,
            color: "#4ecdc4",
            opacity: 0.06,
            width: 1,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            grab: {
              distance: 180,
              links: { opacity: 0.15 },
            },
            push: { quantity: 2 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
