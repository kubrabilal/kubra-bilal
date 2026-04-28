import { useEffect, useMemo, useRef, useState } from "react";
import { styled } from "@stitches/react";
import { SoundOutlined, SoundFilled, DownOutlined } from "@ant-design/icons";

const Controls = styled("div", {
  position: "fixed",
  right: 16,
  bottom: 16,
  zIndex: 50,
  display: "flex",
  gap: 8,
  alignItems: "center",
});

const ControlButton = styled("button", {
  width: 44,
  height: 44,
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.25)",
  backgroundColor: "rgba(0,0,0,0.35)",
  color: "#fff",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  backdropFilter: "blur(6px)",
  boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
  transition: "transform 120ms ease, background-color 120ms ease",
  "&:hover": {
    transform: "scale(1.03)",
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  "&:active": {
    transform: "scale(0.98)",
  },
});

const ArrowHint = styled("div", {
  width: 44,
  height: 44,
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.25)",
  backgroundColor: "rgba(255,255,255,0.22)",
  color: "#fff",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  backdropFilter: "blur(6px)",
  animation: "hintPulse 1.4s ease-in-out infinite",
  "@keyframes hintPulse": {
    "0%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(3px)" },
    "100%": { transform: "translateY(0)" },
  },
});

type BackgroundMusicProps = {
  enabled: boolean;
};

export default function BackgroundMusic({ enabled }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);

  const src = useMemo(() => "./assets/background music.mp3", []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    if (!enabled) {
      el.pause();
      return;
    }

    if (muted) {
      el.pause();
      return;
    }

    // Must be triggered after user interaction; caller ensures `enabled` flips on click.
    void el.play();
  }, [enabled, muted]);

  if (!enabled) return null;

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <Controls>
        <ArrowHint aria-hidden="true">
          <DownOutlined />
        </ArrowHint>
        <ControlButton
          type="button"
          aria-label={muted ? "Sesi aç" : "Sesi kapat"}
          onClick={() => setMuted((m) => !m)}
        >
          {muted ? <SoundOutlined /> : <SoundFilled />}
        </ControlButton>
      </Controls>
    </>
  );
}

