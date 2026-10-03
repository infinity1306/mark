import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene2_Execution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Word letters for staggered spring explosion
  const word = "EXECUTION";
  const letters = word.split("");

  // Subtitle spring
  const subtitleSpring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 16, stiffness: 190 },
  });

  // Stamp badge rotation & scale
  const badgeSpring = spring({
    frame: frame - 14,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const badgeRotation = frame * 1.8;

  // Background ticker tape horizontal translation
  const ticker1 = (frame * -6) % 1200;
  const ticker2 = (frame * 5) % 1200;

  // Exit transition (starts at frame 73)
  const exitProgress = interpolate(frame, [72, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitX = interpolate(exitProgress, [0, 1], [0, -180]);
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
        opacity: exitOpacity,
        transform: `translateX(${exitX}px)`,
        padding: "0 60px",
        boxSizing: "border-box",
      }}
    >
      {/* Background Kinetic Ticker Tapes */}
      <div
        style={{
          position: "absolute",
          top: "16%",
          left: -400,
          right: -400,
          display: "flex",
          whiteSpace: "nowrap",
          transform: `translateX(${ticker1}px) rotate(-1.5deg)`,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "20px",
          fontWeight: 700,
          letterSpacing: "6px",
          color: "rgba(255, 255, 255, 0.08)",
          pointerEvents: "none",
        }}
      >
        {[...Array(6)].map((_, i) => (
          <span key={i} style={{ marginRight: "60px" }}>
            SHIP FASTER • CODE DEEPER • REFINE DETAILS • RUN TESTS • PUSH TO PROD •
          </span>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "16%",
          left: -400,
          right: -400,
          display: "flex",
          whiteSpace: "nowrap",
          transform: `translateX(${ticker2}px) rotate(1.5deg)`,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "20px",
          fontWeight: 700,
          letterSpacing: "6px",
          color: "rgba(212, 255, 0, 0.08)",
          pointerEvents: "none",
        }}
      >
        {[...Array(6)].map((_, i) => (
          <span key={i} style={{ marginRight: "60px" }}>
            THE PROOF IS IN THE WORK • NO EXCUSES • ZERO AMBIGUITY • MAXIMUM SPEED •
          </span>
        ))}
      </div>

      {/* Rotating Circular Technical Stamp Badge */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          right: "10%",
          width: "150px",
          height: "150px",
          opacity: badgeSpring,
          transform: `scale(${badgeSpring}) rotate(${badgeRotation}deg)`,
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 160 160" width="100%" height="100%">
          <defs>
            <path
              id="circlePath"
              d="M 80, 80 m -62, 0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
            />
          </defs>
          <circle
            cx="80"
            cy="80"
            r="68"
            fill="none"
            stroke="rgba(212, 255, 0, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text
            fill="#d4ff00"
            fontSize="10.5"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="bold"
            letterSpacing="2.5"
          >
            <textPath href="#circlePath">
              ★ VERIFIED DELIVERABLE ★ 100% SHIPPED ★ MASTERCLASS ★
            </textPath>
          </text>
          <circle cx="80" cy="80" r="14" fill="#d4ff00" />
          <polygon
            points="80,72 82,78 88,78 83,82 85,88 80,84 75,88 77,82 72,78 78,78"
            fill="#070708"
          />
        </svg>
      </div>

      {/* Tag indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          padding: "8px 20px",
          borderRadius: "100px",
          marginBottom: "28px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "13px",
          color: "rgba(255, 255, 255, 0.8)",
          letterSpacing: "2px",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#00f0ff",
          }}
        />
        <span>THE ONLY TRUE DIFFERENTIATOR</span>
      </div>

      {/* STAGGERED EXPLOSIVE KINETIC LETTERS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px",
        }}
      >
        {letters.map((char, index) => {
          const letterSpring = spring({
            frame: frame - index * 2.5,
            fps,
            config: { damping: 11, stiffness: 260 },
          });

          const letterY = interpolate(letterSpring, [0, 1], [140, 0]);
          const letterScale = interpolate(letterSpring, [0, 1], [0.3, 1]);
          const letterRotation = interpolate(
            letterSpring,
            [0, 1],
            [(index % 2 === 0 ? 1 : -1) * 20, 0]
          );

          return (
            <span
              key={index}
              style={{
                display: "inline-block",
                fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
                fontSize: "165px",
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1,
                letterSpacing: "-2px",
                opacity: letterSpring,
                transform: `translateY(${letterY}px) scale(${letterScale}) rotate(${letterRotation}deg)`,
                textShadow: "0 10px 40px rgba(0,0,0,0.8)",
              }}
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* Subtitle Statement with Dynamic Highlight Card */}
      <div
        style={{
          marginTop: "40px",
          opacity: subtitleSpring,
          transform: `translateY(${interpolate(subtitleSpring, [0, 1], [30, 0])}px)`,
          display: "flex",
          alignItems: "center",
          gap: "14px",
          background: "rgba(212, 255, 0, 0.1)",
          border: "1px solid rgba(212, 255, 0, 0.3)",
          padding: "16px 36px",
          borderRadius: "8px",
          backdropFilter: "blur(12px)",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "26px",
            fontWeight: 700,
            color: "#d4ff00",
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          IS THE ONLY CURRENCY THAT MATTERS
        </span>
      </div>
    </div>
  );
};
