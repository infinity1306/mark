import React from "react";
import { Composition, Sequence } from "remotion";
import { BackgroundGrid } from "./components/BackgroundGrid";
import { TechnicalHud } from "./components/TechnicalHud";
import { Scene1_Intro } from "./scenes/Scene1_Intro";
import { Scene2_Execution } from "./scenes/Scene2_Execution";
import { Scene3_Rhythm } from "./scenes/Scene3_Rhythm";
import { Scene4_Quote } from "./scenes/Scene4_Quote";
import { Scene5_Outro } from "./scenes/Scene5_Outro";

export const TOTAL_DURATION = 380; // ~12.6 seconds @ 30fps
export const VIDEO_FPS = 30;
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;

export const KineticMotionVideo: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
        backgroundColor: "#070708",
        overflow: "hidden",
      }}
    >
      {/* Persistent Animated Grid & Ambient Lights */}
      <BackgroundGrid />

      {/* Persistent Real-time HUD (Timecode, REC, Equalizer, Crosshairs) */}
      <TechnicalHud />

      {/* SCENE 1: Phase 1 - Ideas Are Cheap (Frames 0 - 78) */}
      <Sequence from={0} durationInFrames={78} premountFor={15}>
        <Scene1_Intro />
      </Sequence>

      {/* SCENE 2: Phase 2 - Execution (Frames 74 - 160) */}
      <Sequence from={74} durationInFrames={86} premountFor={15}>
        <Scene2_Execution />
      </Sequence>

      {/* SCENE 3: Phase 3 - Speed / Momentum / Obsession (Frames 156 - 246) */}
      <Sequence from={156} durationInFrames={90} premountFor={15}>
        <Scene3_Rhythm />
      </Sequence>

      {/* SCENE 4: Phase 4 - The Core Quote (Frames 242 - 336) */}
      <Sequence from={242} durationInFrames={94} premountFor={15}>
        <Scene4_Quote />
      </Sequence>

      {/* SCENE 5: Phase 5 - Outro & Brand Lockup (Frames 332 - 380) */}
      <Sequence from={332} durationInFrames={48} premountFor={15}>
        <Scene5_Outro />
      </Sequence>
    </div>
  );
};

export const MyComposition: React.FC = () => {
  return (
    <Composition
      id="KineticMotionGraphic"
      component={KineticMotionVideo}
      durationInFrames={TOTAL_DURATION}
      fps={VIDEO_FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
  );
};
