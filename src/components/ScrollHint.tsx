import { styled } from "@stitches/react";

/** Aligns with hero title: near-black / charcoal read on photo + cream sections */
const CHARCOAL = "#2a2a2a";

const Outer = styled("div", {
  position: "fixed",
  left: 0,
  right: 0,
  bottom: "calc(max(28px, env(safe-area-inset-bottom, 0px)) + 16px)",
  zIndex: 100,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",
  pointerEvents: "none",
  animation: "scrollHintIn 880ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
  "@keyframes scrollHintIn": {
    "0%": { opacity: 0, transform: "translateY(16px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
});

const Inner = styled("div", {
  pointerEvents: "auto",
  width: "max-content",
  maxWidth: "min(92vw, 440px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  opacity: 0.7,
  transition:
    "opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
  "@media (hover: hover) and (pointer: fine)": {
    "&:hover": {
      opacity: 1,
      transform: "translateY(-2px)",
    },
  },
});

const Label = styled("p", {
  margin: 0,
  padding: "0 16px",
  textAlign: "center",
  fontSize: "clamp(1.45rem, 4.8vw, 2.15rem)",
  fontWeight: 700,
  letterSpacing: "0.055em",
  color: CHARCOAL,
  textShadow:
    "-1px 0 #9e9e9e, 0 1px #9e9e9e, 1px 0 #9e9e9e, 0 -1px #9e9e9e",
});

const Chevron = styled("span", {
  display: "block",
  marginTop: "20px",
  fontSize: "clamp(1.15rem, 3.6vw, 1.6rem)",
  lineHeight: 1,
  color: CHARCOAL,
  textShadow:
    "-1px 0 #9e9e9e, 0 1px #9e9e9e, 1px 0 #9e9e9e, 0 -1px #9e9e9e",
  animation: "scrollHintNudge 2.65s ease-in-out infinite",
  "@keyframes scrollHintNudge": {
    "0%, 100%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(7px)" },
  },
});

export default function ScrollHint() {
  return (
    <Outer aria-hidden="true">
      <Inner>
        <Label>Aşağı kaydırın</Label>
        <Chevron>↓</Chevron>
      </Inner>
    </Outer>
  );
}
