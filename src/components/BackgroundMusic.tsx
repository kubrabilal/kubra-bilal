import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { styled } from "@stitches/react";
import { SoundOutlined, SoundFilled, DownOutlined } from "@ant-design/icons";
const ASSET_BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

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

  const src = useMemo(() => `${ASSET_BASE}/assets/background music.mp3`, []);

  const ensurePlayback = useCallback(() => {
    const el = audioRef.current;
    if (!el || !enabled || muted) return;

    if (el.paused) {
      const maybePromise = el.play();
      if (maybePromise && typeof maybePromise.catch === "function") {
        maybePromise.catch(() => {
          // iOS Safari can reject the first attempt; gesture listeners below retry.
        });
      }
    }
  }, [enabled, muted]);

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

    ensurePlayback();
  }, [enabled, muted, ensurePlayback]);

  useEffect(() => {
    if (!enabled || muted) return;

    // Retry playback from common gestures for iPhone/Safari reliability.
    const events: Array<keyof WindowEventMap> = [
      "touchstart",
      "pointerdown",
      "click",
      "keydown",
    ];
    events.forEach((eventName) =>
      window.addEventListener(eventName, ensurePlayback, { passive: true })
    );
    document.addEventListener("visibilitychange", ensurePlayback);

    const el = audioRef.current;
    el?.addEventListener("canplay", ensurePlayback);
    el?.addEventListener("loadeddata", ensurePlayback);

    return () => {
      events.forEach((eventName) =>
        window.removeEventListener(eventName, ensurePlayback)
      );
      document.removeEventListener("visibilitychange", ensurePlayback);
      el?.removeEventListener("canplay", ensurePlayback);
      el?.removeEventListener("loadeddata", ensurePlayback);
    };
  }, [enabled, muted, ensurePlayback]);

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

