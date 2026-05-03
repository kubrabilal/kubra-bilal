import { styled } from "@stitches/react";

const Wrap = styled("div", {
  position: "fixed",
  left: 0,
  right: 0,
  bottom: "max(28px, env(safe-area-inset-bottom, 0px))",
  zIndex: 100,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",
  pointerEvents: "none",
  animation: "scrollHintIn 780ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
  "@keyframes scrollHintIn": {
    "0%": { opacity: 0, transform: "translateY(18px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
});

const Label = styled("p", {
  margin: 0,
  padding: "0 16px",
  textAlign: "center",
  fontSize: "clamp(1.5rem, 5vw, 2.35rem)",
  fontWeight: 600,
  letterSpacing: "0.06em",
  color: "#d4af37",
  textShadow:
    "0 1px 3px rgba(0,0,0,0.55), 0 0 28px rgba(212,175,55,0.45), 0 0 1px rgba(212,175,55,0.9)",
});

const Chevron = styled("span", {
  display: "block",
  marginTop: "10px",
  fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
  lineHeight: 1,
  color: "#d4af37",
  opacity: 0.92,
  animation: "scrollHintBob 2.1s ease-in-out infinite",
  "@keyframes scrollHintBob": {
    "0%, 100%": { transform: "translateY(0)", opacity: 0.85 },
    "50%": { transform: "translateY(10px)", opacity: 1 },
  },
});

export default function ScrollHint() {
  return (
    <Wrap aria-hidden="true">
      <Label>Aşağı kaydırın</Label>
      <Chevron>↓</Chevron>
    </Wrap>
  );
}
