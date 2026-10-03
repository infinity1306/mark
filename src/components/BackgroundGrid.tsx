import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const BackgroundGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Subtle grid offset animation
  const gridOffsetY = (frame * 1.2) % 60;
  const gridOffsetX = (frame * 0.4) % 60;

  // Pulsing ambient lights
  const glowScale = interpolate(
    Math.sin(frame * 0.05),
    [-1, 1],
    [0.85, 1.15]
  );
  const glowOpacity = interpolate(
    Math.sin(frame * 0.04),
    [-1, 1],
    [0.12, 0.22]
  );

  return (
    <div
      style={{
        position: "absolute",
        width,
        height,
        backgroundColor: "#070708",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Dynamic Animated Grid Pattern */}
      <div
        style={{
          position: "absolute",
          inset: -120,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: `translate(${gridOffsetX}px, ${gridOffsetY}px)`,
          opacity: 0.65,
        }}
      />

      {/* Primary Ambient Glow - Electric Lime */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "25%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212, 255, 0, 0.18) 0%, rgba(212, 255, 0, 0) 70%)",
          filter: "blur(90px)",
          transform: `translate(-50%, -50%) scale(${glowScale})`,
          opacity: glowOpacity * 1.2,
          pointerEvents: "none",
        }}
      />

      {/* Secondary Ambient Glow - Cyan Accent */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "20%",
          width: 850,
          height: 850,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, rgba(0, 240, 255, 0) 70%)",
          filter: "blur(110px)",
          transform: `translate(30%, 30%) scale(${glowScale * 0.9})`,
          opacity: glowOpacity,
          pointerEvents: "none",
        }}
      />

      {/* Subtle Vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, transparent 40%, rgba(5, 5, 7, 0.85) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Horizontal Scanline Accent */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: `${(frame * 4) % (height + 200) - 100}px`,
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(212, 255, 0, 0.35), transparent)",
          filter: "blur(1px)",
          opacity: 0.7,
        }}
      />
    </div>
  );
};
