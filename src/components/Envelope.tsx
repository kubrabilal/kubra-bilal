import { useState } from "react";
import { styled } from "@stitches/react";

const Overlay = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "#f5f5f0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
  transition: "all 0.8s ease",
  variants: {
    isOpen: {
      true: { transform: "translateY(-100vh)", pointerEvents: "none" },
    },
  },
});

const EnvelopeContainer = styled("div", {
  position: "relative",
  width: "100vw",
  height: "100vh",
  backgroundColor: "#c9d9c3",
  backgroundImage: `
    radial-gradient(circle at 15% 20%, rgba(150, 170, 130, 0.3) 2px, transparent 3px),
    radial-gradient(circle at 85% 75%, rgba(150, 170, 130, 0.3) 2px, transparent 3px),
    radial-gradient(circle at 25% 80%, rgba(150, 170, 130, 0.3) 2px, transparent 3px),
    radial-gradient(circle at 70% 15%, rgba(150, 170, 130, 0.3) 2px, transparent 3px),
    linear-gradient(135deg, rgba(180, 195, 170, 0.15) 0%, transparent 50%),
    linear-gradient(to bottom, rgba(150, 170, 130, 0.08) 0%, transparent 100%)
  `,
  cursor: "pointer",
  boxShadow: "inset 0 0 60px rgba(0,0,0,0.08)",
  perspective: "1200px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
});

const Flap = styled("div", {
  position: "fixed",
  top: "-50vh",
  left: "50%",
  transform: "translateX(-50%)",
  width: "100vw",
  height: "50vh",
  backgroundColor: "#b8d4a8",
  backgroundImage: `
    radial-gradient(circle at 20% 30%, rgba(150, 170, 130, 0.4) 2px, transparent 3px),
    radial-gradient(circle at 80% 60%, rgba(150, 170, 130, 0.4) 2px, transparent 3px),
    linear-gradient(135deg, rgba(180, 195, 170, 0.2) 0%, transparent 50%)
  `,
  transformOrigin: "top center",
  transition: "transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  zIndex: 5,
  boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
  variants: {
    animate: {
      true: { transform: "translateX(-50%) rotateX(180deg)", zIndex: 0 },
    },
  },
});

const LeftFlap = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  borderLeft: "50vw solid #a8c999",
  borderBottom: "50vh solid transparent",
  zIndex: 0,
});

const RightFlap = styled("div", {
  position: "absolute",
  top: 0,
  right: 0,
  width: 0,
  height: 0,
  borderRight: "50vw solid #a8c999",
  borderBottom: "50vh solid transparent",
  zIndex: 0,
});

const Letter = styled("div", {
  position: "absolute",
  bottom: "15vh",
  left: "50%",
  transform: "translateX(-50%)",
  width: "min(90vw, 520px)",
  padding: "0 1.5rem",
  backgroundColor: "transparent",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontSize: "clamp(1rem, 3vw, 2.5rem)",
  fontStyle: "italic",
  fontWeight: "300",
  color: "#7a8c70",
  zIndex: 1,
  opacity: 0.9,
  lineHeight: 1.4,
});

const LetterMessage = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.35rem",
});

const WelcomeText = styled("p", {
  margin: 0,
  fontSize: "clamp(1.2rem, 3.2vw, 2.7rem)",
});

const PromptText = styled("p", {
  margin: 0,
  fontSize: "clamp(0.95rem, 2vw, 1.5rem)",
  letterSpacing: "0.04em",
});

const WaxSeal = styled("div", {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "clamp(80px, 12vw, 140px)",
  height: "clamp(80px, 12vw, 140px)",
  borderRadius: "50%",
  background: "radial-gradient(circle at 35% 35%, #f5f1e8, #e8ddd0, #d4c9b9)",
  boxShadow: "0 12px 25px rgba(0,0,0,0.2), inset -4px -4px 10px rgba(0,0,0,0.1), inset 2px 2px 5px rgba(255,255,255,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
  fontWeight: "700",
  letterSpacing: "0.15em",
  color: "#a8c999",
  zIndex: 10,
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translate(-50%, -50%) scale(1.1)",
  },
});

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Wait for animation to finish before removing overlay
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <Overlay isOpen={isOpen}>
      <EnvelopeContainer onClick={handleOpen}>
        <LeftFlap />
        <RightFlap />
        <Flap animate={isOpen} />
        <WaxSeal>K&B</WaxSeal>
        <Letter>
          <LetterMessage>
            <WelcomeText>Hos geldiniz</WelcomeText>
            <PromptText>Daveti acmak icin dokunun</PromptText>
          </LetterMessage>
        </Letter>
      </EnvelopeContainer>
    </Overlay>
  );
}