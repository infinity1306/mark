import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene5_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Emblem spring
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 200 },
  });

  // Title spring
  const titleSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 15, stiffness: 180 },
  });

  // Subtitle spring
  const subSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 18, stiffness: 160 },
  });

  // Final fade to black (frames 50 to 65)
  const fadeOut = interpolate(frame, [48, 65], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const emblemRotation = frame * 0.75;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
        padding: "0 60px",
        boxSizing: "border-box",
      }}
    >
      {/* Geometric Emblem */}
      <div
        style={{
          position: "relative",
          width: "120px",
          height: "120px",
          marginBottom: "36px",
          opacity: logoSpring,
          transform: `scale(${logoSpring})`,
        }}
      >
        {/* Outer Rotating Dashed Ring */}
        <div
          style={{
            position: "absolute",
            inset: -15,
            borderRadius: "50%",
            border: "1.5px dashed rgba(212, 255, 0, 0.4)",
            transform: `rotate(${emblemRotation}deg)`,
          }}
        />

        {/* Outer Square rotated 45 deg */}
        <div
          style={{
            position: "absolute",
            inset: 15,
            border: "2px solid #d4ff00",
            transform: "rotate(45deg)",
            boxShadow: "0 0 25px rgba(212, 255, 0, 0.4)",
          }}
        />

        {/* Inner Diamond */}
        <div
          style={{
            position: "absolute",
            inset: 32,
            background: "linear-gradient(135deg, #d4ff00, #00f0ff)",
            transform: `rotate(${45 - emblemRotation * 2}deg)`,
          }}
        />

        {/* Center dot */}
        <div
          style={{
            position: "absolute",
            inset: 52,
            backgroundColor: "#070708",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Brand Title */}
      <h1
        style={{
          fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
          fontSize: "80px",
          fontWeight: 900,
          color: "#ffffff",
          letterSpacing: "4px",
          margin: 0,
          textTransform: "uppercase",
          opacity: titleSpring,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
          textShadow: "0 0 35px rgba(255, 255, 255, 0.25)",
        }}
      >
        ANTIGRAVITY
      </h1>

      {/* Brand Subtitle & Metadata */}
      <div
        style={{
          marginTop: "16px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "14px",
          color: "#d4ff00",
          letterSpacing: "5px",
          textTransform: "uppercase",
          opacity: subSpring,
          transform: `translateY(${interpolate(subSpring, [0, 1], [20, 0])}px)`,
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <span>MOTION DESIGN STUDIO</span>
        <span>•</span>
        <span style={{ color: "rgba(255, 255, 255, 0.6)" }}>EST. 2026</span>
      </div>
    </div>
  );
};
