import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for first line: "IDEAS ARE"
  const line1Spring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 180 },
  });

  // Entrance spring for punch word: "CHEAP." (delayed by 18 frames)
  const cheapSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 12, stiffness: 240 },
  });

  // Strikethrough line animation (starts at frame 34)
  const strikeProgress = spring({
    frame: frame - 34,
    fps,
    config: { damping: 18, stiffness: 200 },
  });

  // Subtext entrance (starts at frame 42)
  const subtextSpring = spring({
    frame: frame - 42,
    fps,
    config: { damping: 20, stiffness: 150 },
  });

  // Target reticle rotation
  const reticleAngle = frame * 2.5;

  // Scene exit zoom & fade out (starts at frame 68)
  const exitProgress = interpolate(frame, [68, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 1.4]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${exitScale})`,
        opacity: exitOpacity,
        filter: `blur(${exitProgress * 12}px)`,
        padding: "0 80px",
        boxSizing: "border-box",
      }}
    >
      {/* Decorative Index Tag */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "15px",
          color: "#d4ff00",
          letterSpacing: "4px",
          marginBottom: "24px",
          opacity: line1Spring,
          transform: `translateY(${interpolate(line1Spring, [0, 1], [20, 0])}px)`,
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "36px",
            height: "2px",
            backgroundColor: "#d4ff00",
          }}
        />
        <span>PHASE_01 // THE INCONVENIENT TRUTH</span>
        <span
          style={{
            display: "inline-block",
            width: "36px",
            height: "2px",
            backgroundColor: "#d4ff00",
          }}
        />
      </div>

      {/* Main Kinetic Typography Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Line 1: IDEAS ARE */}
        <h1
          style={{
            fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
            fontSize: "115px",
            fontWeight: 800,
            letterSpacing: "-2px",
            color: "#ffffff",
            margin: 0,
            lineHeight: 1.05,
            opacity: line1Spring,
            transform: `translateY(${interpolate(line1Spring, [0, 1], [60, 0])}px) scale(${interpolate(
              line1Spring,
              [0, 1],
              [0.9, 1]
            )})`,
            textTransform: "uppercase",
          }}
        >
          Ideas Are
        </h1>

        {/* Line 2: CHEAP. */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <h1
            style={{
              fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
              fontSize: "170px",
              fontWeight: 900,
              letterSpacing: "2px",
              color: "#d4ff00",
              margin: 0,
              lineHeight: 0.95,
              textTransform: "uppercase",
              opacity: cheapSpring,
              transform: `scale(${interpolate(
                cheapSpring,
                [0, 1],
                [1.6, 1]
              )}) translateY(${interpolate(cheapSpring, [0, 1], [40, 0])}px)`,
              textShadow: "0 0 35px rgba(212, 255, 0, 0.45)",
            }}
          >
            Cheap.
          </h1>

          {/* Aggressive Strikethrough Bar */}
          <div
            style={{
              position: "absolute",
              top: "52%",
              left: "-15px",
              width: `${strikeProgress * 108}%`,
              height: "12px",
              backgroundColor: "#ff3366",
              boxShadow: "0 0 20px #ff3366",
              transform: "rotate(-3deg)",
              transformOrigin: "left center",
              borderRadius: "4px",
              pointerEvents: "none",
            }}
          />

          {/* Precision Target Reticle */}
          <div
            style={{
              position: "absolute",
              right: "-70px",
              top: "10%",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              border: "1px dashed rgba(212, 255, 0, 0.6)",
              transform: `rotate(${reticleAngle}deg) scale(${cheapSpring})`,
              opacity: cheapSpring,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: "#d4ff00",
                borderRadius: "50%",
              }}
            />
          </div>
        </div>
      </div>

      {/* Subtitle / Manifesto Callout */}
      <div
        style={{
          marginTop: "48px",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "24px",
          color: "rgba(255, 255, 255, 0.7)",
          letterSpacing: "3px",
          textTransform: "uppercase",
          opacity: subtextSpring,
          transform: `translateY(${interpolate(subtextSpring, [0, 1], [30, 0])}px)`,
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <span style={{ color: "#d4ff00", fontWeight: 700 }}>[ 01 ]</span>
        <span>Every great product was once just a hallway pitch.</span>
      </div>
    </div>
  );
};
