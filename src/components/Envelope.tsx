import { useState } from "react";
import { styled, keyframes } from "@stitches/react";

const openFlap = keyframes({
  "0%": { transform: "rotateX(0deg)", zIndex: 5 },
  "100%": { transform: "rotateX(180deg)", zIndex: 1 },
});

const slideUp = keyframes({
  "0%": { transform: "translateY(0)" },
  "100%": { transform: "translateY(-100%)", opacity: 0 },
});

const Overlay = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "#fdfbfb",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999, // Stays on top of everything
  transition: "all 0.8s ease",
  variants: {
    isOpen: {
      true: { transform: "translateY(-100vh)", pointerEvents: "none" },
    },
  },
});

const EnvelopeContainer = styled("div", {
  position: "relative",
  width: "500px",
  height: "350px",
  backgroundColor: "#d4a574",
  cursor: "pointer",
  boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
  perspective: "1200px",
  "@media (max-width: 768px)": {
    width: "400px",
    height: "280px",
  },
  "@media (max-width: 480px)": {
    width: "300px",
    height: "210px",
  },
});

const Flap = styled("div", {
  position: "absolute",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: 0,
  height: 0,
  borderLeft: "250px solid transparent",
  borderRight: "250px solid transparent",
  borderTop: "175px solid #c49564",
  transformOrigin: "top center",
  transition: "transform 0.6s ease",
  zIndex: 5,
  variants: {
    animate: {
      true: { transform: "translateX(-50%) rotateX(180deg)", zIndex: 0 },
    },
  },
  "@media (max-width: 768px)": {
    borderLeft: "200px solid transparent",
    borderRight: "200px solid transparent",
    borderTop: "140px solid #c49564",
  },
  "@media (max-width: 480px)": {
    borderLeft: "150px solid transparent",
    borderRight: "150px solid transparent",
    borderTop: "105px solid #c49564",
  },
});

const LeftFlap = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  borderLeft: "250px solid #b8935a",
  borderBottom: "175px solid transparent",
  zIndex: 0,
  "@media (max-width: 768px)": {
    borderLeft: "200px solid #b8935a",
    borderBottom: "140px solid transparent",
  },
  "@media (max-width: 480px)": {
    borderLeft: "150px solid #b8935a",
    borderBottom: "105px solid transparent",
  },
});

const RightFlap = styled("div", {
  position: "absolute",
  top: 0,
  right: 0,
  width: 0,
  height: 0,
  borderRight: "250px solid #b8935a",
  borderBottom: "175px solid transparent",
  zIndex: 0,
  "@media (max-width: 768px)": {
    borderRight: "200px solid #b8935a",
    borderBottom: "140px solid transparent",
  },
  "@media (max-width: 480px)": {
    borderRight: "150px solid #b8935a",
    borderBottom: "105px solid transparent",
  },
});

const Letter = styled("div", {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    right: "20px",
    width: "auto",
    height: "auto",
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "500",
    color: "#5a4a3a",
    zIndex: 1,
    "@media (max-width: 768px)": {
      fontSize: "24px",
      bottom: "16px",
    },
    "@media (max-width: 480px)": {
      fontSize: "18px",
      bottom: "12px",
    },
});

const WaxSeal = styled("div", {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  background: "radial-gradient(circle at 30% 30%, #ffd700, #ffed4e, #daa520)",
  boxShadow: "0 8px 15px rgba(0,0,0,0.25), inset -3px -3px 8px rgba(0,0,0,0.15)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "36px",
  fontWeight: "bold",
  color: "#8b4513",
  zIndex: 10,
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translate(-50%, -50%) scale(1.08)",
  },
  "@media (max-width: 768px)": {
    width: "100px",
    height: "100px",
    fontSize: "28px",
  },
  "@media (max-width: 480px)": {
    width: "80px",
    height: "80px",
    fontSize: "22px",
  },
});

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Wait for animation to finish before removing overlay
    setTimeout(() => {
      onOpen();
    }, 1000);
  };

  return (
    <Overlay isOpen={isOpen}>
      <EnvelopeContainer onClick={handleOpen}>
        <LeftFlap />
        <RightFlap />
        <Flap animate={isOpen} />
        <Letter>
            <div>
                <p>Açmak için dokunun</p>
            </div>
        </Letter>
        <WaxSeal>K&B</WaxSeal>
      </EnvelopeContainer>
    </Overlay>
  );
}