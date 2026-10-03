import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const TechnicalHud: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Timecode calculation
  const totalSeconds = Math.floor(frame / fps);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  const frames = (frame % fps).toString().padStart(2, "0");
  const timecode = `00:${minutes}:${seconds}:${frames}`;

  // Blinking REC dot
  const recBlink = Math.floor(frame / 15) % 2 === 0;

  // Progress percentage
  const progressPercent = Math.min(
    100,
    Math.round((frame / durationInFrames) * 100)
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 50,
        fontFamily: "'JetBrains Mono', monospace",
        color: "rgba(255, 255, 255, 0.45)",
        fontSize: "13px",
        padding: "36px 48px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      {/* TOP HUD BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          paddingBottom: "14px",
        }}
      >
        {/* REC & Timecode */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: recBlink ? "#d4ff00" : "rgba(212, 255, 0, 0.2)",
              boxShadow: recBlink
                ? "0 0 10px rgba(212, 255, 0, 0.8)"
                : "none",
              transition: "all 0.1s ease",
            }}
          />
          <span style={{ fontWeight: 700, color: "#fff", letterSpacing: "1px" }}>
            REC [{timecode}]
          </span>
          <span
            style={{
              background: "rgba(212, 255, 0, 0.15)",
              color: "#d4ff00",
              padding: "2px 8px",
              borderRadius: "3px",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            LIVE SYNC
          </span>
        </div>

        {/* Center Tag */}
        <div style={{ letterSpacing: "2px", fontSize: "11px", opacity: 0.75 }}>
          [ MANIFESTO // KINETIC_SYS_V4.2 ]
        </div>

        {/* Right Info */}
        <div style={{ display: "flex", gap: "18px", fontSize: "12px" }}>
          <span>FPS: 30.00</span>
          <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>1920 × 1080 FHD</span>
          <span style={{ color: "#00f0ff" }}>RENDER: ACTIVE</span>
        </div>
      </div>

      {/* CORNER CROSSHAIRS */}
      <div
        style={{
          position: "absolute",
          top: "60px",
          left: "48px",
          fontSize: "18px",
          color: "rgba(255, 255, 255, 0.25)",
        }}
      >
        +
      </div>
      <div
        style={{
          position: "absolute",
          top: "60px",
          right: "48px",
          fontSize: "18px",
          color: "rgba(255, 255, 255, 0.25)",
        }}
      >
        +
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          left: "48px",
          fontSize: "18px",
          color: "rgba(255, 255, 255, 0.25)",
        }}
      >
        +
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          right: "48px",
          fontSize: "18px",
          color: "rgba(255, 255, 255, 0.25)",
        }}
      >
        +
      </div>

      {/* BOTTOM HUD BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          paddingTop: "14px",
        }}
      >
        {/* Equalizer Waveform */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "18px" }}>
          {[...Array(12)].map((_, i) => {
            const barHeight = interpolate(
              Math.sin(frame * 0.35 + i * 0.8) * Math.cos(frame * 0.2 + i * 0.4),
              [-1, 1],
              [4, 18]
            );
            return (
              <div
                key={i}
                style={{
                  width: "3px",
                  height: `${barHeight}px`,
                  backgroundColor: i % 3 === 0 ? "#d4ff00" : "rgba(255, 255, 255, 0.6)",
                  borderRadius: "1px",
                }}
              />
            );
          })}
          <span style={{ fontSize: "11px", marginLeft: "8px", opacity: 0.6 }}>
            RHYTHM_ENGINE
          </span>
        </div>

        {/* Center Progress Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "320px" }}>
          <span style={{ fontSize: "11px", minWidth: "35px" }}>{progressPercent}%</span>
          <div
            style={{
              flex: 1,
              height: "3px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                background: "linear-gradient(90deg, #d4ff00, #00f0ff)",
              }}
            />
          </div>
          <span style={{ fontSize: "11px", opacity: 0.6 }}>F: {frame}/{durationInFrames}</span>
        </div>

        {/* Right coordinates */}
        <div style={{ fontSize: "11px", letterSpacing: "1px", opacity: 0.7 }}>
          SEQ_ID: #KT-9940 // BUFFER_OK
        </div>
      </div>
    </div>
  );
};
