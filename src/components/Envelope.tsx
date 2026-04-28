import { useEffect, useRef, useState } from "react";
import { styled } from "@stitches/react";

type Phase = "cover" | "intro" | "exit";

const Overlay = styled("div", {
  position: "fixed",
  inset: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
  backgroundColor: "#000",
});

const Cover = styled("button", {
  all: "unset",
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  cursor: "pointer",
  backgroundImage: `url("./assets/background.png")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
});

const CoverShade = styled("div", {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.50) 75%, rgba(0,0,0,0.65) 100%)",
});

const TapText = styled("div", {
  position: "relative",
  zIndex: 1,
  width: "min(92vw, 680px)",
  marginBottom: "min(12vh, 110px)",
  padding: "0.9rem 1.1rem",
  borderRadius: 16,
  backgroundColor: "rgba(0,0,0,0.35)",
  backdropFilter: "blur(6px)",
  textAlign: "center",
  color: "#fff",
  fontSize: "clamp(1.05rem, 2.7vw, 1.8rem)",
  letterSpacing: "0.02em",
  userSelect: "none",
  variants: {
    disabled: {
      true: {
        opacity: 0.8,
      },
    },
  },
});

const IntroVideo = styled("video", {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  backgroundColor: "#000",
});

type EnvelopeProps = {
  onOpen: () => void;
  onInteract?: () => void;
  backgroundReady?: boolean;
};

export default function Envelope({
  onOpen,
  onInteract,
  backgroundReady = false,
}: EnvelopeProps) {
  const [phase, setPhase] = useState<Phase>("cover");
  const [introReady, setIntroReady] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const introRef = useRef<HTMLVideoElement | null>(null);
  const didInteractRef = useRef(false);
  const fullyReady = introReady && backgroundReady;

  const handleFirstInteraction = () => {
    if (didInteractRef.current) return;
    didInteractRef.current = true;
    onInteract?.();
  };

  const startIntro = () => {
    if (!fullyReady) return;
    handleFirstInteraction();
    setPhase("intro");
  };

  useEffect(() => {
    if (phase !== "intro") return;

    const el = introRef.current;
    if (!el) return;

    try {
      el.currentTime = 0;
    } catch {
      // ignore
    }

    void el.play();
  }, [phase]);

  const finish = () => {
    setPhase("exit");
    setIsDone(true);
    onOpen();
  };

  if (isDone) {
    return null;
  }

  return (
    <Overlay>
      {phase === "cover" && (
        <Cover type="button" onClick={startIntro} aria-label="Daveti aç">
          <CoverShade />
          <TapText disabled={!fullyReady}>
            Mektubu açmak için dokunun
            {!fullyReady ? " (Yukleniyor...)" : ""}
          </TapText>
        </Cover>
      )}

      <IntroVideo
        ref={introRef}
        playsInline
        preload="auto"
        onCanPlayThrough={() => setIntroReady(true)}
        onEnded={finish}
        onClick={finish}
        style={{ visibility: phase === "intro" ? "visible" : "hidden" }}
      >
        <source src="./assets/giris.mp4" type="video/mp4" />
      </IntroVideo>

    </Overlay>
  );
}