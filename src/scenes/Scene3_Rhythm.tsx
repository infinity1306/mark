import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene3_Rhythm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Three distinct rhythmic phases:
  // Beat 1: frames 0 - 28 -> SPEED
  // Beat 2: frames 28 - 58 -> MOMENTUM
  // Beat 3: frames 58 - 90 -> OBSESSION

  const activeBeat = frame < 28 ? 1 : frame < 58 ? 2 : 3;

  // Spring for Beat 1 (SPEED)
  const speedSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 280 },
  });

  // Spring for Beat 2 (MOMENTUM)
  const momentumSpring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 10, stiffness: 280 },
  });

  // Spring for Beat 3 (OBSESSION)
  const obsessionSpring = spring({
    frame: frame - 58,
    fps,
    config: { damping: 12, stiffness: 260 },
  });

  // Global exit (starts at frame 78)
  const exitProgress = interpolate(frame, [78, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.75]);
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
        padding: "0 80px",
        boxSizing: "border-box",
      }}
    >
      {/* Dynamic Phase Counter Header */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          marginBottom: "32px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "14px",
          letterSpacing: "3px",
        }}
      >
        <div
          style={{
            padding: "6px 16px",
            borderRadius: "4px",
            backgroundColor: activeBeat === 1 ? "#d4ff00" : "rgba(255,255,255,0.06)",
            color: activeBeat === 1 ? "#070708" : "rgba(255,255,255,0.4)",
            fontWeight: 700,
            transition: "all 0.15s ease",
          }}
        >
          [01] SPEED
        </div>
        <div
          style={{
            padding: "6px 16px",
            borderRadius: "4px",
            backgroundColor: activeBeat === 2 ? "#00f0ff" : "rgba(255,255,255,0.06)",
            color: activeBeat === 2 ? "#070708" : "rgba(255,255,255,0.4)",
            fontWeight: 700,
            transition: "all 0.15s ease",
          }}
        >
          [02] MOMENTUM
        </div>
        <div
          style={{
            padding: "6px 16px",
            borderRadius: "4px",
            backgroundColor: activeBeat === 3 ? "#ff3366" : "rgba(255,255,255,0.06)",
            color: activeBeat === 3 ? "#ffffff" : "rgba(255,255,255,0.4)",
            fontWeight: 700,
            transition: "all 0.15s ease",
          }}
        >
          [03] OBSESSION
        </div>
      </div>

      {/* BEAT 1: SPEED */}
      {frame < 30 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: speedSpring,
            transform: `scale(${interpolate(speedSpring, [0, 1], [1.8, 1])}) rotate(${interpolate(
              speedSpring,
              [0, 1],
              [-4, 0]
            )}deg)`,
          }}
        >
          <div
            style={{
              position: "relative",
              textAlign: "center",
            }}
          >
            {/* Echo Shadow */}
            <span
              style={{
                position: "absolute",
                top: "8px",
                left: "-12px",
                fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
                fontSize: "190px",
                fontWeight: 900,
                color: "rgba(212, 255, 0, 0.25)",
                letterSpacing: "-4px",
                lineHeight: 0.9,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              SPEED.
            </span>
            <span
              style={{
                position: "relative",
                fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
                fontSize: "190px",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-4px",
                lineHeight: 0.9,
                textShadow: "0 0 40px rgba(212, 255, 0, 0.4)",
              }}
            >
              SPEED.
            </span>
          </div>
          <div
            style={{
              marginTop: "24px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "24px",
              color: "#d4ff00",
              letterSpacing: "4px",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            // VELOCITY ELIMINATES DOUBT
          </div>
        </div>
      )}

      {/* BEAT 2: MOMENTUM */}
      {frame >= 28 && frame < 58 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: momentumSpring,
            transform: `scale(${interpolate(momentumSpring, [0, 1], [0.6, 1])}) translateY(${interpolate(
              momentumSpring,
              [0, 1],
              [80, 0]
            )}px)`,
          }}
        >
          <div
            style={{
              position: "relative",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
                fontSize: "180px",
                fontWeight: 900,
                fontStyle: "italic",
                color: "#00f0ff",
                letterSpacing: "-2px",
                lineHeight: 0.9,
                textShadow: "0 0 45px rgba(0, 240, 255, 0.5)",
              }}
            >
              MOMENTUM.
            </span>
          </div>
          <div
            style={{
              marginTop: "24px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "24px",
              color: "#ffffff",
              letterSpacing: "4px",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            // INERTIA BECOMES UNSTOPPABLE
          </div>
        </div>
      )}

      {/* BEAT 3: OBSESSION */}
      {frame >= 58 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: obsessionSpring,
            transform: `scale(${interpolate(
              obsessionSpring,
              [0, 1],
              [1.5, 1]
            )})`,
          }}
        >
          <div
            style={{
              position: "relative",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
                fontSize: "180px",
                fontWeight: 900,
                color: "#ff3366",
                letterSpacing: "1px",
                lineHeight: 0.9,
                textShadow: "0 0 50px rgba(255, 51, 102, 0.5)",
              }}
            >
              OBSESSION.
            </span>
          </div>
          <div
            style={{
              marginTop: "24px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "24px",
              color: "#ffffff",
              letterSpacing: "4px",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            // RELENTLESS ATTENTION TO CRAFT
          </div>
        </div>
      )}
    </div>
  );
};
