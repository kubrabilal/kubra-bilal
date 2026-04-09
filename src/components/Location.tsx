import { styled } from "@stitches/react";
import { Divider, Button } from "antd";

const Wrapper = styled("div", {
  background: "#efebe9",
  backgroundImage: "url(./assets/GroovePaper.png)",
  width: "100%",
  paddingBottom: 42,
  textAlign: "center",
});

const Title = styled("p", {
  fontSize: "2vh",
  fontWeight: "bold",
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
        {/* 2. UPDATE THESE DETAILS for your Konya venue */}
        <p style={{ fontSize: "1.9vh", fontWeight: "600", color: "#444", marginBottom: "4px" }}>
          Tektaş Düğün Salonu
        </p>
        <p style={{ fontSize: "1.6vh", color: "#666", marginBottom: "22px" }}>
          Karatay, Konya, Türkiye
        </p>
        
        {/* THE BUTTON (ALSO PRESENT JUST IN CASE) */}
        <Button 
          type="primary" 
          size="large" 
          onClick={() => window.open(mapUrl, "_blank")}
          style={{ 
            background: "#d4af37", 
            borderColor: "#d4af37",
            borderRadius: "4px",
            height: "45px",
            padding: "0 30px"
          }}
        >
          Konumu Google Haritalar&apos;da Aç
        </Button>
      </div>
    </Wrapper>
  );
}