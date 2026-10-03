import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene4_Quote: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow continuous cinematic zoom
  const cameraZoom = interpolate(frame, [0, 95], [0.95, 1.05]);

  // Entrance spring for card container
  const cardSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 140 },
  });

  // Staggered text entrances
  const line1Spring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 200 },
  });

  const line2Spring = spring({
    frame: frame - 24,
    fps,
    config: { damping: 14, stiffness: 200 },
  });

  // Highlight Box Spring for "IGNORED" (spring bounce)
  const highlightSpring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 12, stiffness: 220 },
  });

  // Author stamp spring
  const stampSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 18, stiffness: 160 },
  });

  // Scene Exit (starts at frame 82)
  const exitProgress = interpolate(frame, [82, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
  const exitScale = interpolate(exitProgress, [0, 1], [1, 1.15]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
        transform: `scale(${cameraZoom * exitScale})`,
        padding: "0 60px",
        boxSizing: "border-box",
      }}
    >
      {/* Central Glassmorphic Card Container */}
      <div
        style={{
          position: "relative",
          width: "1150px",
          padding: "60px 80px",
          background: "rgba(18, 20, 24, 0.65)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "24px",
          boxShadow: "0 30px 90px rgba(0, 0, 0, 0.8), 0 0 40px rgba(212, 255, 0, 0.08)",
          opacity: cardSpring,
          transform: `scale(${cardSpring}) translateY(${interpolate(
            cardSpring,
            [0, 1],
            [60, 0]
          )}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Technical Top Border Accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "15%",
            right: "15%",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #d4ff00, transparent)",
          }}
        />

        {/* Header Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "13px",
            color: "rgba(255, 255, 255, 0.5)",
            letterSpacing: "4px",
            marginBottom: "36px",
          }}
        >
          <span style={{ color: "#d4ff00" }}>✦</span>
          <span>THE BUILDER'S PRINCIPLE</span>
          <span style={{ color: "#d4ff00" }}>✦</span>
        </div>

        {/* Main Quote Block */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {/* Line 1: BUILD SOMETHING */}
          <div
            style={{
              fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
              fontSize: "76px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-1px",
              lineHeight: 1.1,
              textTransform: "uppercase",
              opacity: line1Spring,
              transform: `translateY(${interpolate(line1Spring, [0, 1], [30, 0])}px)`,
            }}
          >
            Build Something
          </div>

          {/* Line 2: THAT CANNOT BE */}
          <div
            style={{
              fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
              fontSize: "76px",
              fontWeight: 800,
              color: "rgba(255, 255, 255, 0.75)",
              letterSpacing: "-1px",
              lineHeight: 1.1,
              textTransform: "uppercase",
              opacity: line2Spring,
              transform: `translateY(${interpolate(line2Spring, [0, 1], [30, 0])}px)`,
            }}
          >
            That Cannot Be
          </div>

          {/* Line 3: IGNORED (With Dynamic Lime Highlighter) */}
          <div
            style={{
              position: "relative",
              display: "inline-block",
              marginTop: "16px",
            }}
          >
            {/* Dynamic Expanding Highlight Box */}
            <div
              style={{
                position: "absolute",
                inset: "-8px -24px",
                backgroundColor: "#d4ff00",
                borderRadius: "8px",
                transform: `scaleX(${highlightSpring}) scaleY(${highlightSpring})`,
                transformOrigin: "center center",
                boxShadow: "0 0 45px rgba(212, 255, 0, 0.65)",
                zIndex: 1,
              }}
            />

            {/* Ignored Text */}
            <span
              style={{
                position: "relative",
                zIndex: 2,
                fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
                fontSize: "105px",
                fontWeight: 900,
                color: "#070708",
                letterSpacing: "4px",
                lineHeight: 1,
                textTransform: "uppercase",
                display: "inline-block",
                opacity: highlightSpring,
              }}
            >
              IGNORED.
            </span>
          </div>
        </div>

        {/* Author / Manifesto Signature */}
        <div
          style={{
            marginTop: "48px",
            display: "flex",
            alignItems: "center",
            gap: "18px",
            opacity: stampSpring,
            transform: `translateY(${interpolate(stampSpring, [0, 1], [20, 0])}px)`,
          }}
        >
          <div
            style={{
              width: "48px",
              height: "2px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          />
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "18px",
              color: "rgba(255, 255, 255, 0.8)",
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            // CODE • AESTHETICS • IMPACT
          </span>
          <div
            style={{
              width: "48px",
              height: "2px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
