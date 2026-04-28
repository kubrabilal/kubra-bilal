import { styled } from "@stitches/react";
import { Divider } from "antd";

const Wrapper = styled("div", {
  background: "#f7f1e7",
  backgroundImage: "url(./assets/GroovePaper.png)",
  width: "100%",
  paddingBottom: 42,
  textAlign: "center",
  fontFamily: "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
});

const Title = styled("p", {
  fontSize: "3.2vh",
  fontWeight: 700,
  opacity: 0.85,
  marginBottom: 0,
});

const Image = styled("img", {
  width: "75%",
  maxWidth: 1024,
  borderRadius: "8px",
  marginBottom: "10px", // Reduced margin since it's now inside a link
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease-in-out",
  '&:hover': {
    transform: "scale(1.02)", // Subtle pop effect when hovering on desktop
  },
});

export default function Location() {
  // 1. UPDATE THIS LINK with your actual Google Maps Share URL
  const mapUrl = "https://maps.app.goo.gl/XfihTt1FtguAzmJdA";

  return (
    <Wrapper>
      <Divider plain style={{ marginTop: 0, marginBottom: 32 }}>
        <Title>Konum</Title>
      </Divider>
      
      {/* MAKING THE IMAGE CLICKABLE */}
      <a href={mapUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-block' }}>
        <Image 
          src="./assets/LocationMap.png" 
          alt="Wedding Venue Map" 
          style={{ cursor: 'pointer' }} 
        />
      </a>

      <div style={{ marginTop: "15px" }}>
        <p style={{ fontSize: "2.5vh", fontWeight: 700, color: "#444", marginBottom: "4px" }}>
          Tektaş Düğün Salonu
        </p>
        <p style={{ fontSize: "2.1vh", fontWeight: 700, color: "#666", marginBottom: "22px" }}>
          Karatay, Konya, Türkiye
        </p>
      </div>
    </Wrapper>
  );
}