import { styled } from "@stitches/react";
import type { Data } from "@/types";
import { useEffect, useRef, useState } from "react";
const ASSET_BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

const Layout = styled("div", {
  width: "100%",
  height: "100vh",
  overflow: "hidden",
  margin: "0px auto",
  position: "relative",
});

const TitleWrapper = styled("div", {
  position: "absolute",
  width: "100%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  textShadow: "-1px 0 #9e9e9e, 0 1px #9e9e9e, 1px 0 #9e9e9e, 0 -1px #9e9e9e",
});

const VideoBackground = styled("video", {
  backgroundColor: "#aeb8b3 !important",
  opacity: 0.9,
  objectFit: "cover",
  objectPosition: "center center",
  width: "100%",
  height: "100%",
  minHeight: 480,
});

const WeddingInvitation = styled("p", {
  fontSize: "1.5vh",
  opacity: 0.45,
  marginBottom: 16,
});

const Couple = styled("p", {
  fontSize: "7.6vh",
  fontWeight: "bold",
  opacity: 0.9,
  marginBottom: 8,
});

const ElegantDivider = styled("div", {
  width: "min(280px, 60vw)",
  height: 1,
  margin: "0 auto 20px auto",
  background:
    "linear-gradient(to right, rgba(212,175,55,0), rgba(212,175,55,0.95), rgba(212,175,55,0))",
});

const Schedule = styled("div", {
  fontSize: "3.2vh",
  opacity: 0.65,
  marginBottom: 24,
});

const MidDivider = styled("div", {
  width: "min(220px, 52vw)",
  height: 1,
  margin: "10px auto 12px auto",
  background:
    "linear-gradient(to right, rgba(212,175,55,0), rgba(212,175,55,0.9), rgba(212,175,55,0))",
});

type TitleProps = {
  data?: Data;
  playVideo?: boolean;
  onVideoReady?: () => void;
};

export default function Title({
  data,
  playVideo = true,
  onVideoReady,
}: TitleProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const readyFiredRef = useRef(false);
  const [showDividers, setShowDividers] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (!playVideo) {
      el.pause();
      return;
    }

    try {
      el.currentTime = 0;
    } catch {
      // ignore
    }
    void el.play();
  }, [playVideo]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShowDividers(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const markReady = () => {
    if (readyFiredRef.current) return;
    readyFiredRef.current = true;
    onVideoReady?.();
  };

  return (
    <Layout>
      <VideoBackground
        ref={videoRef}
        loop
        muted
        playsInline={true}
        preload="auto"
        onCanPlay={markReady}
        onLoadedData={markReady}
        onCanPlayThrough={markReady}
      >
        <source src={`${ASSET_BASE}/assets/BackgroundVideo.mp4`} type="video/mp4" />
      </VideoBackground>
      <TitleWrapper>
        <Couple>{data?.couple}</Couple>
        <ElegantDivider
          style={{
            opacity: showDividers ? 1 : 0,
            transition: "opacity 3s ease",
          }}
        />
        <Schedule>
          {data?.date}
          <br />
          {data?.time}
          <br />
          <MidDivider
            style={{
              opacity: showDividers ? 1 : 0,
              transition: "opacity 3s ease",
            }}
          />
          {data?.location}
        </Schedule>
      </TitleWrapper>
    </Layout>
  );
}
