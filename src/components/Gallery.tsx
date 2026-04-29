import ImageGallery from "react-image-gallery";
import { Divider } from "antd";
import { styled } from "@stitches/react";
import "react-image-gallery/styles/css/image-gallery.css";
const ASSET_BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

const Wrapper = styled("div", {
  background: "#f7f1e7",
  backgroundImage: `url(${ASSET_BASE}/assets/GroovePaper.png)`,
  width: "100%",
  maxWidth: "100%",
  overflowX: "hidden",
});

const Title = styled("p", {
  fontSize: "4vh",
  fontWeight: "bold",
  opacity: 0.85,
  margin: 0,
  lineHeight: 1.1,
});

const images = [
  {
    original: `${ASSET_BASE}/assets/Gallery_Photo_1.png`,
    thumbnail: `${ASSET_BASE}/assets/Gallery_Photo_1.png`,
  },
  {
    original: `${ASSET_BASE}/assets/Gallery_Photo_2.png`,
    thumbnail: `${ASSET_BASE}/assets/Gallery_Photo_2.png`,
  },
  {
    original: `${ASSET_BASE}/assets/Gallery_Photo_3.png`,
    thumbnail: `${ASSET_BASE}/assets/Gallery_Photo_3.png`,
  },
  {
    original: `${ASSET_BASE}/assets/Gallery_Photo_4.png`,
    thumbnail: `${ASSET_BASE}/assets/Gallery_Photo_4.png`,
  },
  {
    original: `${ASSET_BASE}/assets/Gallery_Photo_5.png`,
    thumbnail: `${ASSET_BASE}/assets/Gallery_Photo_5.png`,
  },
  {
    original: `${ASSET_BASE}/assets/Gallery_Photo_6.png`,
    thumbnail: `${ASSET_BASE}/assets/Gallery_Photo_6.png`,
  },
];

export default function Gallery() {
  return (
    <Wrapper>
      <Divider plain style={{ marginTop: 0, marginBottom: 32 }}>
        <Title>Fotoğraflarımız</Title>
      </Divider>
      <ImageGallery
        showPlayButton={false}
        showFullscreenButton={false}
        items={images}
      />
    </Wrapper>
  );
}
